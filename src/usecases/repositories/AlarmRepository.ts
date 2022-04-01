import Alarm from "@src/entities/interfaces/Alarm";

export default interface AlarmRepository {
  getAllAlarmsForSpecificMeasurer(measurerIp: string): Promise<Array<Alarm>>;
}