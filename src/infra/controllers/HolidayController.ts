import HolidayRepository from "@src/usecases/repositories/HolidayRepository";
import AddHoliday from "@src/usecases/HolidayRelated/AddHoliday";
import DeleteHoliday from "@src/usecases/HolidayRelated/DeleteHoliday";
import GetAllHolidays from "@src/usecases/HolidayRelated/GetAllHolidays";
import Holiday from "@src/entities/Holiday";
import GetHolidayByID from "@src/usecases/HolidayRelated/GetHolidayByID";
import GetHolidayByName from "@src/usecases/HolidayRelated/GetHolidayByName";

export default class HolidayController {

  static addHoliday(params: any, body: any, holidayRepository: HolidayRepository): Promise<Holiday> {
    const { name, day } = body;
    const addHolidayUseCase = new AddHoliday(holidayRepository).execute(name, day);
    return addHolidayUseCase;
  }

  static deleteHoliday(params: any, body: any, holidayRepository: HolidayRepository): Promise<Holiday> {
    const { id } = params;
    const deleteHolidayUseCase = new DeleteHoliday(holidayRepository).execute(id);
    return deleteHolidayUseCase
  }

  static getAllHolidays(params: any, body: any, holidayRepository: HolidayRepository): Promise<Array<Holiday>> {
    const getAllHolidaysUsecase = new GetAllHolidays(holidayRepository).execute();
    return getAllHolidaysUsecase;
  }
  
  static getHolidayByID(params: any, body: any, holidayRepository: HolidayRepository): Promise<Holiday> {
    const { id } = params;
    const getHolidayByID = new GetHolidayByID(holidayRepository).execute(id);
    return getHolidayByID;
  }

  static getHolidayByName(params: any, body: any, holidayRepository: HolidayRepository): Promise<Holiday> {
    const { name } = params;
    const getHolidayByName = new GetHolidayByName(holidayRepository).execute(name);
    return getHolidayByName;
  }
}