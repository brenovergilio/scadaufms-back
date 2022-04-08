import Alarm from "@src/entities/Alarm";

export default interface AlarmRepository {
  deleteAlarm(id: number): void;
  getAlarmByID(id: number): Promise<Alarm>;
  getAllAlarmsForSpecificMeasurer(measurerID: number): Promise<Array<Alarm>>;
}