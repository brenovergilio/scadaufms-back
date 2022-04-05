import MedicaoMD30 from "@src/entities/MedicaoMD30";
import MedidorMD30 from "@src/entities/MedidorMD30";
import MedicaoMD30Repository from "./repositories/MedicaoMD30Repository";
import MedidorMD30Repository from "./repositories/MedidorMD30Repository";
import DateRange from "./util/DateRange";

export default class GetMedidorMD30 {
  medidorMD30Repository: MedidorMD30Repository;
  medicaoMD30Repository: MedicaoMD30Repository;
  
  constructor(medidorMD30Repository: MedidorMD30Repository, medicaoMD30Repository: MedicaoMD30Repository) {
    this.medidorMD30Repository = medidorMD30Repository;
    this.medicaoMD30Repository = medicaoMD30Repository;
  }

  async execute(ip: string, dateRange: DateRange): Promise<MedidorMD30> {
    const medicoesMD30: Array<MedicaoMD30> = await this.medicaoMD30Repository.getMedicoesMD30PerDateRange(ip, dateRange);
    const medidorMD30: MedidorMD30 = await this.medidorMD30Repository.getMedidorMD30ByIP(ip);
    medidorMD30.medicoesMD30 = medicoesMD30;
    return medidorMD30;
  }
}