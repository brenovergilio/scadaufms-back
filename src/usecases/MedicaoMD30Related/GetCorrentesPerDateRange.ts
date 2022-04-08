import MedicaoMD30 from "@src/entities/MedicaoMD30";
import MedicaoMD30Repository from "../repositories/MedicaoMD30Repository";

export default class GetCorrentesPerDateRange {
  medicaoMD30Repository: MedicaoMD30Repository;

  constructor(medidorMD30Repository: MedicaoMD30Repository) {
    this.medicaoMD30Repository = medidorMD30Repository;
  }

  async execute(id: number): Promise<Array<MedicaoMD30>> {
    const correntes: Array<MedicaoMD30> = await this.medicaoMD30Repository.getCorrentesPerDateRange(id);    
    return correntes;
  }
}