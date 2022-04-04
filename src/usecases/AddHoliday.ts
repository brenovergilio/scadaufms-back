import Holiday from "@src/entities/Holiday";
import HolidayRepository from "./repositories/HolidayRepository";

export default class AddHoliday {
  holidayRepository: HolidayRepository;

  constructor(holidayRepository: HolidayRepository) {
    this.holidayRepository = holidayRepository;
  }

  execute(id: number, name: string, day: Date): void {
    const holiday: Holiday = new Holiday(id, name, day);
    
    if (holiday)
      this.holidayRepository.addHoliday(holiday.id, holiday.name, holiday.day); 
  }
}