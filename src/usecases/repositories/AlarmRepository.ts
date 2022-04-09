import Alarm from '@src/entities/Alarm';

export default interface AlarmRepository {
  deleteAlarm(id: number): Promise<Alarm>;
  getAlarmByID(id: number): Promise<Alarm | null>;
  getAllAlarmsForSpecificMeasurer(measurerID: number): Promise<Array<Alarm>>;
}
