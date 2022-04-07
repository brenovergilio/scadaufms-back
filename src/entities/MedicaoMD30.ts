import InvalidIPv4Error from "./errors/InvalidIPv4Error";
import Measurement from "./interfaces/Measurement";
import { isValidIPv4 } from "./validators/IPValidators";

export default class MedicaoMD30 implements Measurement {
  measurerIP: string;
  timestamp: Date;
  values: Map<string, number>;
  
  constructor(measurerIP: string, timestamp: Date, values: Map<string, number>) {
    if(isValidIPv4(measurerIP))
      this.measurerIP = measurerIP;
    else
      throw new InvalidIPv4Error();
    
    this.timestamp = timestamp;
    this.values = values;
  }
}