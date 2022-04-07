import HolidayRepository from "@src/usecases/repositories/HolidayRepository";
import AddHoliday from "@src/usecases/HolidayRelated/AddHoliday";
import DeleteHoliday from "@src/usecases/HolidayRelated/DeleteHoliday";
import GetAllHolidays from "@src/usecases/HolidayRelated/GetAllHolidays";
import Holiday from "@src/entities/Holiday";

export default class HolidayController {

  static addHoliday(params: any, body: any, holidayRepository: HolidayRepository): void {
    const { name, day } = body;
    const addHolidayUseCase = new AddHoliday(holidayRepository).execute(name, day);
  }

  static deleteHoliday(params: any, body: any, holidayRepository: HolidayRepository): void {
    const { id } = params;
    const deleteHolidayUseCase = new DeleteHoliday(holidayRepository).execute(id);
  }

  static getAllHolidays(params: any, body: any, holidayRepository: HolidayRepository): Promise<Array<Holiday>> {
    const getAllHolidaysUsecase = new GetAllHolidays(holidayRepository).execute();
    return getAllHolidaysUsecase;
  }
}