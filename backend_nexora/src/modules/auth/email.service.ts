import nodemailer from 'nodemailer';
import { config } from '../../config';

export class EmailService {
  private static transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.emailUser,
      pass: config.emailPass,
    },
  });

  static async sendOTPEmail(email: string, otp: string) {
    const mailOptions = {
      from: `"Nexora Auth" <${config.emailUser}>`,
      to: email,
      subject: 'Your Nexora Verification Code',
      html: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border-radius: 16px; background: linear-gradient(135deg, #0a0a0b 0%, #161618 100%); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.1);">
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="color: #6366f1; margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -0.025em;">NEXORA</h1>
            <p style="color: #94a3b8; margin-top: 8px; font-size: 16px;">Secure Intelligent Access</p>
          </div>
          
          <div style="background: rgba(255, 255, 255, 0.03); border-radius: 12px; padding: 32px; border: 1px solid rgba(255, 255, 255, 0.05);">
            <h2 style="margin-top: 0; font-size: 20px; font-weight: 600; color: #f8fafc;">Verify Your Identity</h2>
            <p style="color: #94a3b8; line-height: 1.6; font-size: 15px;">
              To complete your sign-in, please use the following one-time password (OTP). 
              This code is valid for <span style="color: #f8fafc; font-weight: 600;">15 minutes</span>.
            </p>
            
            <div style="margin: 32px 0; text-align: center;">
              <div style="display: inline-block; padding: 16px 32px; background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 12px;">
                <span style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #818cf8; font-family: 'Courier New', monospace;">${otp}</span>
              </div>
            </div>
            
            <p style="color: #64748b; font-size: 13px; margin-bottom: 0;">
              If you didn't request this code, you can safely ignore this email. Someone may have entered your email address by mistake.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 40px; color: #475569; font-size: 12px;">
            &copy; ${new Date().getFullYear()} Nexora Inc. &bull; Secure AI Platform
          </div>
        </div>
      `,
    };

    if (!config.emailUser || !config.emailPass) {
      console.log('--- DEVELOPMENT MODE: EMAIL NOT SENT ---');
      console.log(`To: ${email}`);
      console.log(`OTP: ${otp}`);
      console.log('---------------------------------------');
      return;
    }

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending OTP email:', error);
      // In development, don't block the flow if email fails
      console.log(`Fallback: OTP for ${email} is ${otp}`);
    }
  }
}
