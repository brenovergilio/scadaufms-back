import Peak from "../interfaces/Peak";
import isEmptyMessageError from "./errors/EmptyMessageError";
import isEmptyNameError from "./errors/EmptyNameError";
import InvalidIPv4Error from "./errors/InvalidIPv4Error";
import InvalidPeakError from "./errors/InvalidPeakError";
import InvalidPortError from "./errors/InvalidPortError";
import { isValidIPv4 } from "./validators/IPValidators";
import { isValidPeak } from "./validators/PeakValidator";
import { isValidPort } from "./validators/PortValidator";
import { isEmptyString } from "./validators/StringValidators";

export function validateAlarmParams(message: string): void {
  if(isEmptyString(message))
    throw new isEmptyMessageError();
}

export function validateHolidayParams(name: string): void {
  if(isEmptyString(name))
    throw new isEmptyNameError();
}

export function validateMedidorMD30Params(ip: string, name: string, port: number, peak?: Peak): void {
  if(!isValidIPv4(ip))
    throw new InvalidIPv4Error();

  if(isEmptyString(name))
    throw new isEmptyNameError();

  if(!isValidPort(port))
    throw new InvalidPortError();

  if(peak)
    if(!isValidPeak(peak))
      throw new InvalidPeakError();  
}