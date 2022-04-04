import Alarm from "@src/entities/Alarm";

export default interface AlarmRepository {
  getAllAlarmsForSpecificMeasurer(measurerIp: string): Promise<Array<Alarm>>;
}