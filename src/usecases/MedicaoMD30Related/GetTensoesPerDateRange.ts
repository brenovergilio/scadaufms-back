import MedicaoMD30 from "@src/entities/MedicaoMD30";
import MedicaoMD30Repository from "../repositories/MedicaoMD30Repository";

export default class GetTensoesPerDateRange {
  medicaoMD30Repository: MedicaoMD30Repository;

  constructor(medicaoMD30Repository: MedicaoMD30Repository) {
    this.medicaoMD30Repository = medicaoMD30Repository;
  }

  async execute(ip: string): Promise<Array<MedicaoMD30>> {
    const tensoes: Array<MedicaoMD30> = await this.medicaoMD30Repository.getTensoesPerDateRange(ip);
    return tensoes;
  }
}