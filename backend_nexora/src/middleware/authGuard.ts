import { Request, Response, NextFunction } from 'express';

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  // TODO: Implement JWT verification and role check
  console.log('authGuard placeholder called');
  next();
};
