import InvalidRushError from '@src/entities/util/errors/InvalidRushError';
import GenericClassValidatorError from '@src/infra/errors/GenericClassValidatorError';
import InvalidPasswordError from '@src/infra/errors/InvalidPasswordError';
import InvalidTokenError from '@src/infra/errors/InvalidTokenError';
import InvalidUsernameError from '@src/infra/errors/InvalidUsernameError';
import UnauthorizedError from '@src/infra/errors/UnauthorizedError';
import AlreadyExistsError from '@src/usecases/util/errors/AlreadyExistsError';
import ConnectionTimedOutError from '@src/usecases/util/errors/ConnectionTimedOutError';
import DuplicatedNameError from '@src/usecases/util/errors/DuplicatedNameError';
import InsufficientPermissionError from '@src/usecases/util/errors/InsufficientPermissionError';
import InvalidDateRangeError from '@src/usecases/util/errors/InvalidDateRangeError';
import NotFoundError from '@src/usecases/util/errors/NotFoundError';
import { NextFunction, Request, Response } from 'express';

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof GenericClassValidatorError)
    return res.status(400).json({ statusCode: 400, message: error.message });

  if (error instanceof InvalidDateRangeError)
    return res.status(400).json({ statusCode: 400, message: error.message });

  if (error instanceof InvalidRushError)
    return res.status(400).json({ statusCode: 400, message: error.message });

  if (error instanceof InvalidTokenError)
    return res.status(400).json({ statusCode: 400, message: error.message });

  if (error instanceof InvalidPasswordError)
    return res.status(401).json({ statusCode: 401, message: error.message });

  if (error instanceof UnauthorizedError)
    return res.status(401).json({ statusCode: 401, message: error.message });

  if (error instanceof InvalidUsernameError)
    return res.status(401).json({ statusCode: 401, message: error.message });

  if (error instanceof InsufficientPermissionError)
    return res.status(403).json({ statusCode: 403, message: error.message });

  if (error instanceof NotFoundError)
    return res.status(404).json({ statusCode: 404, message: error.message });

  if (error instanceof ConnectionTimedOutError)
    return res.status(408).json({ statusCode: 408, message: error.message });

  if (error instanceof DuplicatedNameError)
    return res.status(409).json({ statusCode: 409, message: error.message });

  if (error instanceof AlreadyExistsError)
    return res.status(409).json({ statusCode: 409, message: error.message });

  return res.status(500).json({ statusCode: 500, message: error.message });
}
