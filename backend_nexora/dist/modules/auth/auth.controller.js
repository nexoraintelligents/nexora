"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.resetPassword = exports.forgotPassword = exports.verifyOTP = exports.login = exports.register = void 0;
const auth_service_1 = require("./auth.service");
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(`[AuthController] Registration attempt for email: ${email}`);
        const result = await auth_service_1.AuthService.signup({ name, email, password });
        console.log(`[AuthController] Registration successful for ${email}`);
        res.status(201).json(result);
    }
    catch (error) {
        console.error(`[AuthController] Registration error for ${req.body?.email || 'unknown'}:`, error.message);
        res.status(400).json({ message: error.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`[AuthController] Login attempt for email: ${email}`);
        const result = await auth_service_1.AuthService.login(email, password);
        console.log(`[AuthController] Login result for ${email}:`, result.message || 'Token generated');
        res.status(200).json(result);
    }
    catch (error) {
        console.error(`[AuthController] Login error for ${req.body?.email || 'unknown'}:`, error.message);
        res.status(401).json({ message: error.message });
    }
};
exports.login = login;
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        console.log(`[AuthController] OTP verification attempt for email: ${email}, OTP: ${otp}`);
        const result = await auth_service_1.AuthService.verifyOTP(email, otp);
        console.log(`[AuthController] OTP verification successful for ${email}`);
        res.status(200).json(result);
    }
    catch (error) {
        console.error(`[AuthController] OTP verification error for ${req.body?.email || 'unknown'}:`, error.message);
        res.status(400).json({ message: error.message });
    }
};
exports.verifyOTP = verifyOTP;
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(`[AuthController] Forgot password request for email: ${email}`);
        const result = await auth_service_1.AuthService.forgotPassword(email);
        res.status(200).json(result);
    }
    catch (error) {
        console.error(`[AuthController] Forgot password error for ${req.body?.email}:`, error.message);
        res.status(400).json({ message: error.message });
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
    try {
        const { email, otp, password } = req.body;
        console.log(`[AuthController] Password reset attempt for email: ${email}`);
        const result = await auth_service_1.AuthService.resetPassword(email, otp, password);
        res.status(200).json(result);
    }
    catch (error) {
        console.error(`[AuthController] Password reset error for ${req.body?.email}:`, error.message);
        res.status(400).json({ message: error.message });
    }
};
exports.resetPassword = resetPassword;
const logout = async (req, res) => {
    try {
        const result = await auth_service_1.AuthService.logout();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.logout = logout;
