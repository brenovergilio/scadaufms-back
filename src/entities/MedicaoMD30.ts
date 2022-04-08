import Measurement from "./interfaces/Measurement";

export default class MedicaoMD30 implements Measurement {
  measurerID: number;
  timestamp: Date;
  values: Map<string, number>;
  
  constructor(measurerID: number, timestamp: Date, values: Map<string, number>) {
    this.measurerID = measurerID;
    this.timestamp = timestamp;
    this.values = values;
  }
}