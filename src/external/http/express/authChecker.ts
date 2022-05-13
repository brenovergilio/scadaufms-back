import InvalidTokenError from '@src/infra/errors/InvalidTokenError';
import UnauthorizedError from '@src/infra/errors/UnauthorizedError';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export default function authChecker(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) throw new UnauthorizedError();

  try {
    const secret = process.env.SECRET as string;
    jwt.verify(token, secret);
    next();
  } catch (error) {
    throw new InvalidTokenError();
  }
}
