import Measurer from "./interfaces/measurer";
import PeakHour from "./interfaces/peak-hour";

export default class MedidorMD30 implements Measurer {

  ip: string;
  name: string;
  port: number;
  peakHour: PeakHour;

  constructor(ip: string, name: string, port: number, peakHour: PeakHour = {hour: 17, minute: 30, interval: 3}) {
    this.ip = ip;
    this.name = name;
    this.port = port;
    this.peakHour = peakHour;
  }
}