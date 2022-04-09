import Alarm from '@src/entities/Alarm';

export default class AlarmAdapter {
  static create(
    id: number,
    measurerID: number,
    timestamp: Date,
    message: string
  ) {
    const alarm: Alarm = new Alarm(id, measurerID, timestamp, message);
    return alarm;
  }
}
