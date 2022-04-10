import EmptyMessageError from '@src/entities/util/errors/EmptyMessageError';
import EmptyNameError from '@src/entities/util/errors/EmptyNameError';
import InvalidIPv4Error from '@src/entities/util/errors/InvalidIPv4Error';
import InvalidPortError from '@src/entities/util/errors/InvalidPortError';
import InvalidRushError from '@src/entities/util/errors/InvalidRushError';
import AlreadyExistsError from '@src/usecases/util/errors/AlreadyExistsError';
import DuplicatedNameError from '@src/usecases/util/errors/DuplicatedNameError';
import InvalidDateRangeError from '@src/usecases/util/errors/InvalidDateRangeError';
import NotFoundError from '@src/usecases/util/errors/NotFoundError';
import { NextFunction, Request, Response } from 'express';

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof EmptyNameError)
    return res.status(400).json({ statusCode: 400, message: error.message });

  if (error instanceof InvalidIPv4Error)
    return res.status(400).json({ statusCode: 400, message: error.message });

  if (error instanceof InvalidPortError)
    return res.status(400).json({ statusCode: 400, message: error.message });

  if (error instanceof InvalidDateRangeError)
    return res.status(400).json({ statusCode: 400, message: error.message });

  if (error instanceof InvalidRushError)
    return res.status(400).json({ statusCode: 400, message: error.message });

  if (error instanceof NotFoundError)
    return res.status(404).json({ statusCode: 404, message: error.message });

  if (error instanceof DuplicatedNameError)
    return res.status(409).json({ statusCode: 409, message: error.message });

  if (error instanceof AlreadyExistsError)
    return res.status(409).json({ statusCode: 409, message: error.message });

  return res.status(500).json({ statusCode: 500, message: error.message });
}
