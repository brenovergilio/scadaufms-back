export default class Alarm {
  measurerIP: string;
  timestamp: Date;
  message: string;

  constructor(measurerIP: string, timestamp: Date, message: string) {
    this.measurerIP = measurerIP;
    this.timestamp = timestamp;
    this.message = message;
  }
}