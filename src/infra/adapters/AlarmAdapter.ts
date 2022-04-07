import Alarm from "@src/entities/Alarm";

export default class AlarmAdapter {
  static create(measurerIP: string, timestamp: Date, message: string) {
    const alarm: Alarm = new Alarm(measurerIP, timestamp, message);
    return alarm;
  }
}