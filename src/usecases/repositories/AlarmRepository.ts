import Alarm from "@src/entities/Alarm";

export default interface AlarmRepository {
  deleteAlarm(id: number): void;
  getAllAlarmsForSpecificMeasurer(measurerIp: string): Promise<Array<Alarm>>;
}