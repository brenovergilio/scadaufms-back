import NotFoundError from "../util/errors/NotFoundError";
import MedidorMD30Repository from "../repositories/MedidorMD30Repository";
import { existsByID } from "../util/validators/MedidorMD30Validator";

export default class DeleteMedidorMD30 {
  medidorMD30Repository: MedidorMD30Repository;

  constructor(medidorMD30Repository: MedidorMD30Repository) {
    this.medidorMD30Repository = medidorMD30Repository;
  }

  async execute(id: number): Promise<void> {
    const medidorMD30Exists: boolean = await existsByID(id, this.medidorMD30Repository);

    if(!medidorMD30Exists)
      throw new NotFoundError();
    
    this.medidorMD30Repository.deleteMedidorMD30(id);
  }
}