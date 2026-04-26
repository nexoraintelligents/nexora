"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../user/user.model");
const config_1 = require("../../config");
const email_service_1 = require("./email.service");
class AuthService {
    static async signup(userData) {
        const existingUser = await user_model_1.User.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const user = new user_model_1.User({ ...userData, isVerified: false });
        // Generate 6-digit OTP for signup
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(`[AuthService] Generated OTP for ${userData.email}: ${otp}`);
        const otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
        user.otp = otp;
        user.otpExpiresAt = otpExpiresAt;
        await user.save();
        console.log(`[AuthService] Saved OTP to database for ${userData.email}`);
        await email_service_1.EmailService.sendOTPEmail(user.email, otp);
        return { message: 'Registration successful. OTP sent to your email.' };
    }
    static async login(email, password) {
        const user = await user_model_1.User.findOne({ email });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        // Check if user is verified
        if (!user.isVerified) {
            // Re-send OTP if not verified
            console.log(`[AuthService] User ${email} is not verified. Resending OTP.`);
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            console.log(`[AuthService] New OTP for ${email}: ${otp}`);
            const otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
            user.otp = otp;
            user.otpExpiresAt = otpExpiresAt;
            await user.save();
            console.log(`[AuthService] Saved new OTP to database for ${email}`);
            await email_service_1.EmailService.sendOTPEmail(email, otp);
            throw new Error('Please verify your email. OTP has been resent.');
        }
        // Generate 6-digit OTP for login verification (Two-factor)
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(`[AuthService] Generated login OTP for ${email}: ${otp}`);
        const otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
        user.otp = otp;
        user.otpExpiresAt = otpExpiresAt;
        await user.save();
        console.log(`[AuthService] Saved login OTP to database for ${email}`);
        await email_service_1.EmailService.sendOTPEmail(email, otp);
        return { message: 'OTP sent to email' };
    }
    static async verifyOTP(email, otp) {
        const user = await user_model_1.User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        // Check attempt limit
        if (user.otpAttempts >= 5) {
            user.otp = undefined;
            user.otpExpiresAt = undefined;
            user.otpAttempts = 0;
            await user.save();
            throw new Error('Too many failed attempts. A new OTP has been requested.');
        }
        if (!user.otp || user.otp !== otp) {
            user.otpAttempts += 1;
            await user.save();
            throw new Error(`Invalid OTP. ${5 - user.otpAttempts} attempts remaining.`);
        }
        if (new Date() > user.otpExpiresAt) {
            throw new Error('OTP expired');
        }
        // Mark as verified and clear OTP
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiresAt = undefined;
        user.otpAttempts = 0;
        await user.save();
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, config_1.config.jwtSecret, { expiresIn: '7d' });
        return { user: this.sanitizeUser(user), token };
    }
    static async forgotPassword(email) {
        const user = await user_model_1.User.findOne({ email });
        if (!user) {
            // Don't reveal if user exists for security, but we know it's a reset flow
            // For this app, we'll return a generic success message
            return { message: 'If an account exists, a reset link has been sent.' };
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(`[AuthService] Password reset OTP for ${email}: ${otp}`);
        user.otp = otp;
        user.otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
        user.otpAttempts = 0;
        await user.save();
        await email_service_1.EmailService.sendOTPEmail(email, otp);
        return { message: 'Reset OTP sent to email' };
    }
    static async logout() {
        // In a full implementation, you'd invalidate tokens here
        return { message: 'Logged out successfully' };
    }
    static async resetPassword(email, otp, password) {
        const user = await user_model_1.User.findOne({ email });
        if (!user)
            throw new Error('User not found');
        if (user.otpAttempts >= 5) {
            user.otp = undefined;
            user.otpExpiresAt = undefined;
            user.otpAttempts = 0;
            await user.save();
            throw new Error('Too many failed attempts.');
        }
        if (!user.otp || user.otp !== otp) {
            user.otpAttempts += 1;
            await user.save();
            throw new Error('Invalid OTP');
        }
        if (new Date() > user.otpExpiresAt) {
            throw new Error('OTP expired');
        }
        // Update password (pre-save hook will hash it)
        user.password = password;
        user.otp = undefined;
        user.otpExpiresAt = undefined;
        user.otpAttempts = 0;
        await user.save();
        return { message: 'Password reset successful' };
    }
    static sanitizeUser(user) {
        const sanitized = user.toObject ? user.toObject() : { ...user };
        delete sanitized.password;
        delete sanitized.otp;
        delete sanitized.otpExpiresAt;
        delete sanitized.otpAttempts;
        return sanitized;
    }
}
exports.AuthService = AuthService;
