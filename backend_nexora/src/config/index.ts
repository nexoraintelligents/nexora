import dotenv from 'dotenv';
dotenv.config();

// TODO: Implement env validation with Zod
export const config = {
  port: process.env.PORT || 4000,
  mongodbUri: process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/nexora',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
};
