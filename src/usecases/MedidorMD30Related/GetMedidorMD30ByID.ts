import MedidorMD30 from "@src/entities/MedidorMD30";
import MedidorMD30Repository from "../repositories/MedidorMD30Repository";

export default class GetMedidorMD30ByIP {
  medidorMD30Repository: MedidorMD30Repository;
  
  constructor(medidorMD30Repository: MedidorMD30Repository) {
    this.medidorMD30Repository = medidorMD30Repository;
  }

  async execute(id: number): Promise<MedidorMD30> {
    const medidorMD30: MedidorMD30 = await this.medidorMD30Repository.getMedidorMD30ByID(id);
    return medidorMD30;
  }
}