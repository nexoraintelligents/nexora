"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = exports.createOrder = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const config_1 = require("../../config");
const razorpay = new razorpay_1.default({
    key_id: config_1.config.razorpayKeyId || '',
    key_secret: config_1.config.razorpayKeySecret || '',
});
const createOrder = async (req, res) => {
    try {
        const { amount, currency = 'INR', planName } = req.body;
        const userId = req.user?.id || req.user?.uid;
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
    }
    catch (error) {
        console.error('Razorpay Order Error:', error);
        res.status(500).json({ success: false, message: error.message || 'Error creating Razorpay order' });
    }
};
exports.createOrder = createOrder;
const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const userId = req.user?.id || req.user?.uid;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto_1.default
            .createHmac("sha256", config_1.config.razorpayKeySecret || '')
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
        }
        else {
            res.status(400).json({ success: false, message: "Invalid payment signature" });
        }
    }
    catch (error) {
        console.error('Razorpay Verification Error:', error);
        res.status(500).json({ success: false, message: error.message || 'Error verifying payment' });
    }
};
exports.verifyPayment = verifyPayment;
