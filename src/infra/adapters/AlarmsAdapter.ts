import Alarm from "@src/entities/interfaces/Alarm";

export default class AlarmsAdapter {
  static create(timestamp: Date, message: string) {
    const alarm: Alarm = {timestamp: timestamp, message: message};
    return alarm;
  }
}