import { validateHolidayParams } from "@src/entities/util/EntityFieldsValidators";
import HolidayRepository from "../repositories/HolidayRepository";
import DuplicatedNameError from "../util/errors/DuplicatedNameError";
import { duplicatedName } from "../util/validators/HolidayValidator";

export default class AddHoliday {
  holidayRepository: HolidayRepository;

  constructor(holidayRepository: HolidayRepository) {
    this.holidayRepository = holidayRepository;
  }

  async execute(name: string, day: Date): Promise<void> {
    validateHolidayParams(name);

    const holidayNameDuplicated: boolean = await duplicatedName(name, this.holidayRepository);

    if(holidayNameDuplicated)
      throw new DuplicatedNameError();

    this.holidayRepository.addHoliday(name, day); 
  }
}