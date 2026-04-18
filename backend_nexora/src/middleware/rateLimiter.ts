import { Request, Response, NextFunction } from 'express';

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  // TODO: Implement express-rate-limit + Redis store
  console.log('rateLimiter placeholder called');
  next();
};
