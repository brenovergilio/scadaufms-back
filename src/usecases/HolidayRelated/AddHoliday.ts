import Holiday from '@src/entities/Holiday';
import DuplicatedNameError from '../util/errors/DuplicatedNameError';
import { duplicatedName } from '../util/validators/HolidayValidator';
import { validateAuthenticatedAdmin } from '../util/validators/UserValidator';
import BaseHolidayUseCases from './BaseHolidayUseCases';
import { InputAddHoliday } from './Inputs';

export default class AddHoliday extends BaseHolidayUseCases {
  async execute(input: InputAddHoliday): Promise<Holiday> {
    await validateAuthenticatedAdmin(input.sourceUserID, this.userRepository);

    const holidayNameDuplicated: boolean = await duplicatedName(
      input.name,
      this.holidayRepository
    );

    if (holidayNameDuplicated) throw new DuplicatedNameError();

    const newHoliday: Holiday = new Holiday(input.name, input.day);

    return await this.holidayRepository.addHoliday(newHoliday);
  }
}
