import MedidorMD30Repository from "../repositories/MedidorMD30Repository";

export default class DeleteMedidorMD30 {
  medidorMD30Repository: MedidorMD30Repository;

  constructor(medidorMD30Repository: MedidorMD30Repository) {
    this.medidorMD30Repository = medidorMD30Repository;
  }

  execute(ip: string): void {
    this.medidorMD30Repository.deleteMedidorMD30(ip);
  }
}