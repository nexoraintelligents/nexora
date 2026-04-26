import express from 'express';
import cors from 'cors';
import { firebaseGuard } from './middleware/firebaseGuard';
import { connectDB } from './lib/mongoose';
import authRoutes from './modules/auth/auth.routes';
import { authGuard } from './middleware/auth';
import rateLimit from 'express-rate-limit';

const app = express();
const port = process.env.PORT || 4001;

// Rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs for auth routes
  message: { message: 'Too many requests from this IP, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authLimiter, authRoutes);

app.get('/health', (_, res) => {
  res.status(200).send('OK');
});

// Example firebase protected route
app.get('/api/protected-firebase', firebaseGuard, (req, res) => {
  res.json({ message: 'This is a firebase protected route' });
});

// New JWT protected route
app.get('/api/protected', authGuard, (req, res) => {
  res.json({ message: 'This is a JWT protected route', user: (req as any).user });
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
