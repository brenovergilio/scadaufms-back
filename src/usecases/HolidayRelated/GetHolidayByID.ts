import Holiday from "@src/entities/Holiday";
import HolidayRepository from "../repositories/HolidayRepository";
import NotFoundError from "../util/errors/NotFoundError";

export default class GetHolidayByID {
  holidayRepository: HolidayRepository;

  constructor(alarmRepository: HolidayRepository) {
    this.holidayRepository = alarmRepository;
  }

  async execute(id: number): Promise<Holiday> {
    const holiday = await this.holidayRepository.getHolidayByID(id);

    if(!holiday)
      throw new NotFoundError();

    return holiday;
  }
}