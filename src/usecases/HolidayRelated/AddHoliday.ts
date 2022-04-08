import { validateHolidayParams } from "@src/entities/util/EntityFieldsValidators";
import HolidayRepository from "../repositories/HolidayRepository";

export default class AddHoliday {
  holidayRepository: HolidayRepository;

  constructor(holidayRepository: HolidayRepository) {
    this.holidayRepository = holidayRepository;
  }

  execute(name: string, day: Date): void {
    validateHolidayParams(name);
    this.holidayRepository.addHoliday(name, day); 
  }
}