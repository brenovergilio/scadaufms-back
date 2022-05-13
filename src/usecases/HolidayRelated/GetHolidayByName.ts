import Holiday from '@src/entities/Holiday';
import NotFoundError from '../util/errors/NotFoundError';
import BaseHolidayUseCases from './BaseHolidayUseCases';

export default class GetHolidayByName extends BaseHolidayUseCases {
  async execute(name: string): Promise<Holiday> {
    const holiday = await this.holidayRepository.getHolidayByName(name);

    if (!holiday) throw new NotFoundError();

    return holiday;
  }
}
