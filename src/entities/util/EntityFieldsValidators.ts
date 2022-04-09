import Rush from '../interfaces/Rush';
import isEmptyMessageError from './errors/EmptyMessageError';
import isEmptyNameError from './errors/EmptyNameError';
import InvalidIPv4Error from './errors/InvalidIPv4Error';
import InvalidRushError from './errors/InvalidRushError';
import InvalidPortError from './errors/InvalidPortError';
import { isValidIPv4 } from './validators/IPValidators';
import { isValidRush } from './validators/RushValidator';
import { isValidPort } from './validators/PortValidator';
import { isEmptyString } from './validators/StringValidators';

export function validateAlarmParams(message: string): void {
  if (isEmptyString(message)) throw new isEmptyMessageError();
}

export function validateHolidayParams(name: string): void {
  if (isEmptyString(name)) throw new isEmptyNameError();
}

export function validateMedidorMD30Params(
  ip: string,
  name: string,
  port: number,
  rush?: Rush
): void {
  if (!isValidIPv4(ip)) throw new InvalidIPv4Error();

  if (isEmptyString(name)) throw new isEmptyNameError();

  if (!isValidPort(port)) throw new InvalidPortError();

  if (rush) if (!isValidRush(rush)) throw new InvalidRushError();
}
