import Holiday from '@src/entities/Holiday';
import NotFoundError from '../util/errors/NotFoundError';
import BaseHolidayUseCases from './BaseHolidayUseCases';

export default class GetHolidayByID extends BaseHolidayUseCases {
  async execute(id: string): Promise<Holiday> {
    const holiday = await this.holidayRepository.getHolidayByID(id);

    if (!holiday) throw new NotFoundError();

    return holiday;
  }
}
