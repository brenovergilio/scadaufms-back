import Holiday from "@src/entities/Holiday";
import HolidayRepository from "../repositories/HolidayRepository";
import NotFoundError from "../util/errors/NotFoundError";
import { existsByID } from "../util/validators/HolidayValidator";

export default class DeleteHoliday {
  holidayRepository: HolidayRepository;

  constructor(alarmRepository: HolidayRepository) {
    this.holidayRepository = alarmRepository;
  }

  async execute(id: number): Promise<Holiday> {
    const holidayExists: boolean = await existsByID(id, this.holidayRepository);

    if(!holidayExists)
      throw new NotFoundError();

    return await this.holidayRepository.deleteHoliday(id);
  }
}