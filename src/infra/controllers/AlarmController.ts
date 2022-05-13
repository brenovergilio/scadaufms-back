import Alarm from '@src/entities/Alarm';
import DeleteAlarm from '@src/usecases/AlarmRelated/DeleteAlarm';
import GetAlarmByID from '@src/usecases/AlarmRelated/GetAlarmByID';
import GetAllAlarmsForSpecificMeasurer from '@src/usecases/AlarmRelated/GetAllAlarmsForSpecificMeasurer';
import AlarmRepository from '@src/entities/repositories/AlarmRepository';
import BaseController from './BaseController';
import UserRepository from '@src/entities/repositories/UserRepository';
import { InputDeleteAlarm } from '@src/usecases/AlarmRelated/Inputs';

export default class AlarmController extends BaseController {
  static async deleteAlarm(
    params: any,
    body: any,
    query: any,
    headers: any,
    alarmRepository: AlarmRepository,
    userRepository: UserRepository
  ): Promise<Alarm> {
    const { id } = params;
    const token = headers.authorization.split(' ')[1];
    const sourceUserID = BaseController.decodeIDFromToken(token);
    const input: InputDeleteAlarm = new InputDeleteAlarm(sourceUserID, id);

    await BaseController.validateInput(input);
    const deleteAlarmUseCase = new DeleteAlarm(
      alarmRepository,
      userRepository
    ).execute(input);
    return deleteAlarmUseCase;
  }

  static getAlarmByID(
    params: any,
    body: any,
    query: any,
    headers: any,
    alarmRepository: AlarmRepository,
    userRepository: UserRepository
  ): Promise<Alarm> {
    const { id } = params;
    const getAlarmByID = new GetAlarmByID(
      alarmRepository,
      userRepository
    ).execute(id);
    return getAlarmByID;
  }

  static getAllAlarmsForSpecificMeasurer(
    params: any,
    body: any,
    query: any,
    headers: any,
    alarmRepository: AlarmRepository,
    userRepository: UserRepository
  ): Promise<Array<Alarm>> {
    const { measurerID } = params;
    const getAllAlarmsForSpecificMeasurerUseCase =
      new GetAllAlarmsForSpecificMeasurer(
        alarmRepository,
        userRepository
      ).execute(measurerID);
    return getAllAlarmsForSpecificMeasurerUseCase;
  }
}
