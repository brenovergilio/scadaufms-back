import Holiday from '@src/entities/Holiday';
import HolidayRepository from '../repositories/HolidayRepository';

export default class GetAllHolidays {
  holidayRepository: HolidayRepository;

  constructor(holidayRepository: HolidayRepository) {
    this.holidayRepository = holidayRepository;
  }

  async execute(): Promise<Array<Holiday>> {
    return await this.holidayRepository.getAllHolidays();
  }
}
