import MedicaoMD30 from "@src/entities/MedicaoMD30";
import MedidorMD30 from "@src/entities/MedidorMD30";
import MedidorMD30Repository from "./repositories/MedidorMD30Repository";

export default class GetTensoesFromMD30 {
  medidorMD30Repository: MedidorMD30Repository;

  constructor(medidorMD30Repository: MedidorMD30Repository) {
    this.medidorMD30Repository = medidorMD30Repository;
  }

  execute(ip: string): Array<MedicaoMD30> {
    const medidorMD30: MedidorMD30 = this.medidorMD30Repository.getMedidorMD30ByIP(ip);
    const tensoesWithTimestamp: Array<MedicaoMD30> = medidorMD30.getTensoesWithTimestamps();
    
    return tensoesWithTimestamp;
  }
}