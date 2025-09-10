import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      errors: err.issues,
    });
  }

  if (err instanceof Error && err.name === 'NotFoundError') {
    return res.status(404).json({
      message: 'Resource not found',
      error: err.message,
    });
  }

  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'production' ? {} : (err as Error).message,
  });
};
