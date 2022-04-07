import HolidayRepository from "../repositories/HolidayRepository";

export default class DeleteHoliday {
  holidayRepository: HolidayRepository;

  constructor(alarmRepository: HolidayRepository) {
    this.holidayRepository = alarmRepository;
  }

  execute(id: number): void {
    this.holidayRepository.deleteHoliday(id);
  }
}