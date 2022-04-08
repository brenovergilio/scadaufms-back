import Alarm from "@src/entities/Alarm";
import DeleteAlarm from "@src/usecases/AlarmRelated/DeleteAlarm";
import GetAlarmByID from "@src/usecases/AlarmRelated/GetAlarmByID";
import GetAllAlarmsForSpecificMeasurer from "@src/usecases/AlarmRelated/GetAllAlarmsForSpecificMeasurer";
import AlarmRepository from "@src/usecases/repositories/AlarmRepository";

export default class AlarmController {

  static deleteAlarm(params: any, body: any, alarmRepository: AlarmRepository): Promise<Alarm> {
    const { id } = params;
    const deleteAlarmUseCase = new DeleteAlarm(alarmRepository).execute(id);
    return deleteAlarmUseCase;
  }

  static getAlarmByID(params: any, body: any, alarmRepository: AlarmRepository): Promise<Alarm> {
    const { id } = params;
    const getAlarmByID = new GetAlarmByID(alarmRepository).execute(id);
    return getAlarmByID;
  }

  static getAllAlarmsForSpecificMeasurer(params: any, body: any, alarmRepository: AlarmRepository): Promise<Array<Alarm>> {
    const { measurerID } = params;
    const getAllAlarmsForSpecificMeasurerUseCase = new GetAllAlarmsForSpecificMeasurer(alarmRepository).execute(measurerID);
    return getAllAlarmsForSpecificMeasurerUseCase;
  }
}