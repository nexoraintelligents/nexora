import { Request, Response, NextFunction } from 'express';

export const validate = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
  // TODO: Implement Zod schema validation
  console.log('validate placeholder called');
  next();
};
