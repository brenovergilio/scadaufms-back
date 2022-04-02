import Alarm from "@src/entities/interfaces/Alarm";

export default class AlarmsAdapter {
  static create(measurerIP: string, timestamp: Date, message: string) {
    const alarm: Alarm = {measurerIP: measurerIP, timestamp: timestamp, message: message};
    return alarm;
  }
}