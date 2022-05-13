import Alarm from '@src/entities/Alarm';

export default interface AlarmRepository {
  deleteAlarm(id: string): Promise<Alarm>;
  getAlarmByID(id: string): Promise<Alarm | null>;
  getAllAlarmsForSpecificMeasurer(measurerID: string): Promise<Array<Alarm>>;
}
