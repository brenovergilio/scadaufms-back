import Holiday from '@src/entities/Holiday';
import NotFoundError from '../util/errors/NotFoundError';
import { existsByID } from '../util/validators/HolidayValidator';
import { validateAuthenticatedAdmin } from '../util/validators/UserValidator';
import BaseHolidayUseCases from './BaseHolidayUseCases';
import { InputDeleteHoliday } from './Inputs';

export default class DeleteHoliday extends BaseHolidayUseCases {
  async execute(input: InputDeleteHoliday): Promise<Holiday> {
    await validateAuthenticatedAdmin(input.userID, this.userRepository);

    const holidayExists: boolean = await existsByID(
      input.holidayID,
      this.holidayRepository
    );

    if (!holidayExists) throw new NotFoundError();

    return await this.holidayRepository.deleteHoliday(input.holidayID);
  }
}
