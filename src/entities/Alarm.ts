import { validateAlarmParams } from './util/EntityFieldsValidators';
export default class Alarm {
  id: number;
  measurerID: number;
  timestamp: Date;
  message: string;

  constructor(
    id: number,
    measurerID: number,
    timestamp: Date,
    message: string
  ) {
    validateAlarmParams(message);

    this.id = id;
    this.measurerID = measurerID;
    this.timestamp = timestamp;
    this.message = message;
  }
}
