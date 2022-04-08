import HolidayRepository from "../repositories/HolidayRepository";
import NotFoundError from "../util/errors/NotFoundError";
import { existsByID } from "../util/validators/HolidayValidator";

export default class DeleteHoliday {
  holidayRepository: HolidayRepository;

  constructor(alarmRepository: HolidayRepository) {
    this.holidayRepository = alarmRepository;
  }

  async execute(id: number): Promise<void> {
    const holidayExists: boolean = await existsByID(id, this.holidayRepository);

    if(!holidayExists)
      throw new NotFoundError();
      
    this.holidayRepository.deleteHoliday(id);
  }
}