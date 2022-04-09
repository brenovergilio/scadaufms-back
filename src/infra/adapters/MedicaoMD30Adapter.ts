import MedicaoMD30 from '@src/entities/MedicaoMD30';

export default class MedicaoMD30Adapter {
  static create(
    measurerID: number,
    timestamp: Date,
    keys: Array<string>,
    values: Array<number>
  ) {
    const valuesMap = new Map<string, number>();
    keys.forEach((key, index) => valuesMap.set(key, values[index]));
    return new MedicaoMD30(measurerID, timestamp, valuesMap);
  }
}
