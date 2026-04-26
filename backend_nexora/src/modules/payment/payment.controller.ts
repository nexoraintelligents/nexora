import { Request, Response } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { config } from '../../config';

const razorpay = new Razorpay({
  key_id: config.razorpayKeyId || '',
  key_secret: config.razorpayKeySecret || '',
});

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { amount, currency = 'INR', planName } = req.body;
    const userId = (req as any).user?.id || (req as any).user?.uid;

    if (!amount) {
      return res.status(400).json({ success: false, message: 'Amount is required' });
    }

    const options = {
      amount: Math.round(amount * 100), // Amount in paise
      currency,
      receipt: `receipt_${userId}_${Date.now()}`,
      notes: {
        userId,
        planName
      }
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, data: order });
  } catch (error: any) {
    console.error('Razorpay Order Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Error creating Razorpay order' });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const userId = (req as any).user?.id || (req as any).user?.uid;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", config.razorpayKeySecret || '')
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment verified
      console.log(`Payment verified for user ${userId}: ${razorpay_payment_id}`);
      
      // In a real app, you would update user subscription in DB here
      // For now, we just return success
      
      res.status(200).json({ 
        success: true, 
        message: "Payment verified successfully",
        data: {
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id
        }
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid payment signature" });
    }
  } catch (error: any) {
    console.error('Razorpay Verification Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Error verifying payment' });
  }
};
