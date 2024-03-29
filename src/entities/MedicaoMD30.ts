import Measurement from './interfaces/Measurement';

export default class MedicaoMD30 implements Measurement {
  constructor(
    public measurerID: string,
    public timestamp: Date | string,
    public values: Map<string, number>
  ) {}
}
