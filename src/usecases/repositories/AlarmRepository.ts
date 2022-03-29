import Alarm from "@src/entities/interfaces/alarm";

export default interface AlarmRepository {
  getAllAlarms(measurerIp: string): Array<Alarm>;
}