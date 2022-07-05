import Holiday from '@src/entities/Holiday';
import BaseHolidayUseCases from './BaseHolidayUseCases';

export default class GetAllHolidays extends BaseHolidayUseCases {
  async execute(): Promise<Array<Holiday>> {
    return this.holidayRepository.getAllHolidays();
  }
}
