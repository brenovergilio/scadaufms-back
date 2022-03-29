import Measurement from "./interfaces/measurement";
import Measurer from "./interfaces/measurer";
import PeakHour from "./interfaces/peak-hour";

export default class MedidorMD30 implements Measurer {

  ip: string;
  name: string;
  port: number;
  peakHour: PeakHour;
  measurements: Array<Measurement> = new Array<Measurement>();

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
}