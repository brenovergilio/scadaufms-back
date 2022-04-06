import MedicaoMD30 from "@src/entities/MedicaoMD30";

export default class MedicaoMD30Adapter {
  static create(measurerIP: string, timestamp: Date, keys: Array<string>, values: Array<number>) {
    const valuesMap = new Map<string, number>();
    keys.forEach((key, index) => valuesMap.set(key, values[index]));
    return new MedicaoMD30(measurerIP, timestamp, valuesMap);
  }
}