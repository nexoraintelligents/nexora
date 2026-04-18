import { Request, Response } from 'express';
import { AuthService } from './auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    console.log(`[AuthController] Registration attempt for email: ${email}`);
    const result = await AuthService.signup({ name, email, password });
    console.log(`[AuthController] Registration successful for ${email}`);
    res.status(201).json(result);
  } catch (error: any) {
    console.error(`[AuthController] Registration error for ${req.body?.email || 'unknown'}:`, error.message);
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(`[AuthController] Login attempt for email: ${email}`);
    const result = await AuthService.login(email, password);
    console.log(`[AuthController] Login result for ${email}:`, result.message || 'Token generated');
    res.status(200).json(result);
  } catch (error: any) {
    console.error(`[AuthController] Login error for ${req.body?.email || 'unknown'}:`, error.message);
    res.status(401).json({ message: error.message });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    console.log(`[AuthController] OTP verification attempt for email: ${email}, OTP: ${otp}`);
    const result = await AuthService.verifyOTP(email, otp);
    console.log(`[AuthController] OTP verification successful for ${email}`);
    res.status(200).json(result);
  } catch (error: any) {
    console.error(`[AuthController] OTP verification error for ${req.body?.email || 'unknown'}:`, error.message);
    res.status(400).json({ message: error.message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    console.log(`[AuthController] Forgot password request for email: ${email}`);
    const result = await AuthService.forgotPassword(email);
    res.status(200).json(result);
  } catch (error: any) {
    console.error(`[AuthController] Forgot password error for ${req.body?.email}:`, error.message);
    res.status(400).json({ message: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, otp, password } = req.body;
    console.log(`[AuthController] Password reset attempt for email: ${email}`);
    const result = await AuthService.resetPassword(email, otp, password);
    res.status(200).json(result);
  } catch (error: any) {
    console.error(`[AuthController] Password reset error for ${req.body?.email}:`, error.message);
    res.status(400).json({ message: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.logout();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
