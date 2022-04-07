import MedidorMD30 from "@src/entities/MedidorMD30";
import MedidorMD30Repository from "../repositories/MedidorMD30Repository";

export default class AddMedidorMD30 {
  medidorMD30Repository: MedidorMD30Repository;

  constructor(medidorMD30Repository: MedidorMD30Repository) {
    this.medidorMD30Repository = medidorMD30Repository;
  }

  execute(ip: string, name: string, port: number): MedidorMD30 {
    const medidorMD30: MedidorMD30 = new MedidorMD30(ip, name, port);
    this.medidorMD30Repository.addMedidorMD30(medidorMD30.ip, medidorMD30.name, medidorMD30.port, medidorMD30.peak.hour, medidorMD30.peak.minute, medidorMD30.peak.interval); 
    return medidorMD30;
  }
}