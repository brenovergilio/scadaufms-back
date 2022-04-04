import Alarm from "@src/entities/Alarm";

export default interface AlarmRepository {
  addAlarm(measurerIP: string, timestamp: Date, message: string): void;
  deleteAlarm(id: number): void;
  getAllAlarmsForSpecificMeasurer(measurerIp: string): Promise<Array<Alarm>>;
}