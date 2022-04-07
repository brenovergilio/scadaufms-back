import MedicaoMD30 from "@src/entities/MedicaoMD30";
import MedicaoMD30Repository from "../repositories/MedicaoMD30Repository";

export default class GetFatoresDePotenciaPerDateRange {
  medicaoMD30Repository: MedicaoMD30Repository;

  constructor(medidorMD30Repository: MedicaoMD30Repository) {
    this.medicaoMD30Repository = medidorMD30Repository;
  }

  async execute(ip: string): Promise<Array<MedicaoMD30>> {
    const fatoresDePotencia: Array<MedicaoMD30> = await this.medicaoMD30Repository.getFatoresDePotenciaPerDateRange(ip);    
    return fatoresDePotencia;
  }
}