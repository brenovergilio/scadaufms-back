import Measurement from "./interfaces/measurement";
import Measurer from "./interfaces/measurer";
import PeakHour from "./interfaces/peak-hour";
import Alarm from "./interfaces/alarm";

export default class MedidorMD30 implements Measurer {

  ip: string;
  name: string;
  port: number;
  peakHour: PeakHour;
  measurements: Array<Measurement> = new Array<Measurement>();
  alarms: Array<Alarm> = new Array<Alarm>();

  constructor(ip: string, name: string, port: number, peakHour: PeakHour = {hour: 17, minute: 30, interval: 3}) {
    this.ip = ip;
    this.name = name;
    this.port = port;
    this.peakHour = peakHour;
  }

  addMeasurement(measurement: Measurement) {
    this.measurements.push(measurement);
  }

  getMeasurements(): Array<Measurement> {
    return this.measurements;
  }

  addAlarm(alarm: Alarm) {
    this.alarms.push(alarm);
  }

  getAlarms(): Array<Alarm> {
    return this.alarms;
  }
}