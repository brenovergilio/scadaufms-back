import HolidayRepository from "@src/entities/repositories/HolidayRepository";
import MedicaoMD30Repository from "@src/entities/repositories/MedicaoMD30Repository";
import MedidorMD30Repository from "@src/entities/repositories/MedidorMD30Repository";
import TaxesRepository from "@src/entities/repositories/TaxesRepository";

export default class DeleteAlarm {
  holidayRepository: HolidayRepository;
  medicaoMD30Repository: MedicaoMD30Repository;
  medidorMD30Repository: MedidorMD30Repository;
  taxesRepository: TaxesRepository;

  constructor(
    holidayRepository: HolidayRepository,
    medicaoMD30Repository: MedicaoMD30Repository,
    medidorMD30Repository: MedidorMD30Repository,
    taxesRepository: TaxesRepository
  ) {
    this.holidayRepository = holidayRepository;
    this.medicaoMD30Repository = medicaoMD30Repository;
    this.medidorMD30Repository = medidorMD30Repository;
    this.taxesRepository = taxesRepository;
  }
}
