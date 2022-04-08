import MedidorMD30 from "@src/entities/MedidorMD30";
import NotFoundError from "../util/errors/NotFoundError";
import MedidorMD30Repository from "../repositories/MedidorMD30Repository";

export default class GetMedidorMD30ByIP {
  medidorMD30Repository: MedidorMD30Repository;
  
  constructor(medidorMD30Repository: MedidorMD30Repository) {
    this.medidorMD30Repository = medidorMD30Repository;
  }

  async execute(ip: string): Promise<MedidorMD30> {
    const medidorMD30: MedidorMD30 = await this.medidorMD30Repository.getMedidorMD30ByIP(ip);

    if(!medidorMD30)
      throw new NotFoundError();

    return medidorMD30;
  }
}