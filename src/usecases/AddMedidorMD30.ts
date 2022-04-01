import MedidorMD30 from "@src/entities/MedidorMD30";
import MedidorMD30Repository from "./repositories/MedidorMD30Repository";

export default class AddMedidorMD30 {
  medidorMD30Repository: MedidorMD30Repository;

  constructor(medidorMD30Repository: MedidorMD30Repository) {
    this.medidorMD30Repository = medidorMD30Repository;
  }

  execute(ip: string, name: string, port: number): void {
    const medidorMD30: MedidorMD30 = new MedidorMD30(ip, name, port);
    
    if (medidorMD30)
      this.medidorMD30Repository.addMedidorMD30(ip, name, port); 
  }
}