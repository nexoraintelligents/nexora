import { Router } from 'express';
import * as PaymentController from './payment.controller';
import { authGuard } from '../../middleware/auth';

const router = Router();

// All payment routes are protected by authGuard
router.use(authGuard);

router.post('/create-order', PaymentController.createOrder);
router.post('/verify-payment', PaymentController.verifyPayment);

export default router;
