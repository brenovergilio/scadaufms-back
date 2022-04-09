import isEmptyMessageError from '@src/entities/util/errors/EmptyMessageError';
import isEmptyNameError from '@src/entities/util/errors/EmptyNameError';
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
  if (
    error instanceof
    (isEmptyNameError ||
      isEmptyMessageError ||
      InvalidIPv4Error ||
      InvalidPortError ||
      InvalidRushError ||
      InvalidDateRangeError)
  )
    return res.status(400).send(error.message);

  if (error instanceof (DuplicatedNameError || AlreadyExistsError))
    return res.status(409).send(error.message);

  if (error instanceof NotFoundError)
    return res.status(404).send(error.message);

  return res.status(500).send(error.message);
}
