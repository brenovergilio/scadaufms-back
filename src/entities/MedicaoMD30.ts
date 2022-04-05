import Measurement from "./interfaces/Measurement";

export default class MedicaoMD30 implements Measurement {
  measurerIP: string;
  timestamp: Date;
  values: Map<string, number>;
  
  constructor(measurerIP: string, timestamp: Date, values: Map<string, number>) {
    this.measurerIP = measurerIP;
    this.timestamp = timestamp;
    this.values = values;
  }
}