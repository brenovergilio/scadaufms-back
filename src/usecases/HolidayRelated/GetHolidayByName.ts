import Holiday from "@src/entities/Holiday";
import HolidayRepository from "../repositories/HolidayRepository";
import NotFoundError from "../util/errors/NotFoundError";

export default class GetHolidayByName {
  holidayRepository: HolidayRepository;

  constructor(alarmRepository: HolidayRepository) {
    this.holidayRepository = alarmRepository;
  }

  async execute(name: string): Promise<Holiday> {
    const holiday: Holiday = await this.holidayRepository.getHolidayByName(name);

    if(!holiday)
      throw new NotFoundError();

    return holiday;
  }
}