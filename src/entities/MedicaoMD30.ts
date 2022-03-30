import Measurement from "./interfaces/Measurement";

export default class MedicaoMD30 implements Measurement {
  timestamp: Date;
  values: Map<string, number>;
  
  constructor(timestamp: Date, values: Map<string, number>) {
    this.timestamp = timestamp;
    this.values = values;
  }
  //TODO: Check if this.values have all the md30 measurement fields. 
}