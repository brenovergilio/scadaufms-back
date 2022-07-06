import HolidayRepository from '@src/entities/repositories/HolidayRepository';
import AddHoliday from '@src/usecases/HolidayRelated/AddHoliday';
import DeleteHoliday from '@src/usecases/HolidayRelated/DeleteHoliday';
import GetAllHolidays from '@src/usecases/HolidayRelated/GetAllHolidays';
import Holiday from '@src/entities/Holiday';
import GetHolidayByID from '@src/usecases/HolidayRelated/GetHolidayByID';
import GetHolidayByName from '@src/usecases/HolidayRelated/GetHolidayByName';
import BaseController from './BaseController';
import UserRepository from '@src/entities/repositories/UserRepository';
import {
  InputAddHoliday,
  InputDeleteHoliday,
} from '@src/usecases/HolidayRelated/Inputs';

export default class HolidayController extends BaseController {
  static async addHoliday(
    params: any,
    body: any,
    query: any,
    headers: any,
    holidayRepository: HolidayRepository,
    userRepository: UserRepository
  ): Promise<Holiday> {
    const { name, day } = body;
    const token = headers.authorization.split(' ')[1];
    const sourceUserID = BaseController.decodeIDFromToken(token);
    const input: InputAddHoliday = new InputAddHoliday(
      sourceUserID,
      name,
      new Date(day)
    );

    await BaseController.validateInput(input);

    const addHolidayUseCase = new AddHoliday(
      holidayRepository,
      userRepository
    ).execute(input);
    return addHolidayUseCase;
  }

  static async deleteHoliday(
    params: any,
    body: any,
    query: any,
    headers: any,
    holidayRepository: HolidayRepository,
    userRepository: UserRepository
  ): Promise<Holiday> {
    const { id } = params;
    const token = headers.authorization.split(' ')[1];
    const sourceUserID = BaseController.decodeIDFromToken(token);
    const input: InputDeleteHoliday = new InputDeleteHoliday(sourceUserID, id);

    await BaseController.validateInput(input);
    const deleteHolidayUseCase = new DeleteHoliday(
      holidayRepository,
      userRepository
    ).execute(input);
    return deleteHolidayUseCase;
  }

  static getAllHolidays(
    params: any,
    body: any,
    query: any,
    headers: any,
    holidayRepository: HolidayRepository,
    userRepository: UserRepository
  ): Promise<Array<Holiday>> {
    const getAllHolidaysUsecase = new GetAllHolidays(
      holidayRepository,
      userRepository
    ).execute();
    return getAllHolidaysUsecase;
  }

  static getHolidayByID(
    params: any,
    body: any,
    query: any,
    headers: any,
    holidayRepository: HolidayRepository,
    userRepository: UserRepository
  ): Promise<Holiday> {
    const { id } = params;
    const getHolidayByID = new GetHolidayByID(
      holidayRepository,
      userRepository
    ).execute(id);
    return getHolidayByID;
  }

  static getHolidayByName(
    params: any,
    body: any,
    query: any,
    headers: any,
    holidayRepository: HolidayRepository,
    userRepository: UserRepository
  ): Promise<Holiday> {
    const { name } = params;
    const getHolidayByName = new GetHolidayByName(
      holidayRepository,
      userRepository
    ).execute(name);
    return getHolidayByName;
  }
}
