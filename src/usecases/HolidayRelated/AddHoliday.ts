import Holiday from "@src/entities/Holiday";
import HolidayRepository from "../repositories/HolidayRepository";

export default class AddHoliday {
  holidayRepository: HolidayRepository;

  constructor(holidayRepository: HolidayRepository) {
    this.holidayRepository = holidayRepository;
  }

  execute(name: string, day: Date): void {
    this.holidayRepository.addHoliday(name, day); 
  }
}