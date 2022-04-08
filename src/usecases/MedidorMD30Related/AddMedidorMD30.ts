import Peak from "@src/entities/interfaces/Peak";
import { validateMedidorMD30Params } from "@src/entities/util/EntityFieldsValidators";
import MedidorMD30Repository from "../repositories/MedidorMD30Repository";

export default class AddMedidorMD30 {
  medidorMD30Repository: MedidorMD30Repository;

  constructor(medidorMD30Repository: MedidorMD30Repository) {
    this.medidorMD30Repository = medidorMD30Repository;
  }

  execute(ip: string, name: string, port: number, peak: Peak = {hour: 17, minute: 30, interval: 3}): void {
    validateMedidorMD30Params(ip, name, port, peak);
    this.medidorMD30Repository.addMedidorMD30(ip, name, port, peak.hour, peak.minute, peak.interval); 
  }
}