import Alarm from "@src/entities/Alarm";
import DeleteAlarm from "@src/usecases/AlarmRelated/DeleteAlarm";
import GetAllAlarmsForSpecificMeasurer from "@src/usecases/AlarmRelated/GetAllAlarmsForSpecificMeasurer";
import AlarmRepository from "@src/usecases/repositories/AlarmRepository";

export default class AlarmController {

  static deleteAlarm(params: any, body: any, alarmRepository: AlarmRepository): void {
    const { id } = params;
    const deleteAlarmUseCase = new DeleteAlarm(alarmRepository).execute(id);
  }

  static getAllAlarmsForSpecificMeasurer(params: any, body: any, alarmRepository: AlarmRepository): Promise<Array<Alarm>> {
    const { measurerIP } = params;
    const getAllAlarmsForSpecificMeasurerUseCase = new GetAllAlarmsForSpecificMeasurer(alarmRepository).execute(measurerIP);
    return getAllAlarmsForSpecificMeasurerUseCase;
  }
}