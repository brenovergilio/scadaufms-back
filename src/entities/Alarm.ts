import isEmptyMessageError from "./util/errors/EmptyMessageError";
import InvalidIPv4Error from "./util/errors/InvalidIPv4Error";
import { isValidIPv4 } from "./util/validators/IPValidators";
import { isEmptyString } from "./util/validators/StringValidators";

export default class Alarm {
  measurerIP: string;
  timestamp: Date;
  message: string;

  constructor(measurerIP: string, timestamp: Date, message: string) {
    if(isValidIPv4(measurerIP))
      this.measurerIP = measurerIP;
    else
      throw new InvalidIPv4Error();

    this.timestamp = timestamp;
    
    if(isEmptyString(message))
      throw new isEmptyMessageError();
      
    this.message = message;
  }
}