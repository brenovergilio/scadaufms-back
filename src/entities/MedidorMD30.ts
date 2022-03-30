import Measurer from "./interfaces/Measurer";
import Peak from "./interfaces/Peak";

export default class MedidorMD30 implements Measurer {

  ip: string;
  name: string;
  port: number;
  peak: Peak;

  constructor(ip: string, name: string, port: number, peak: Peak = {hour: 17, minute: 30, interval: 3}) {
    this.ip = ip;
    this.name = name;
    this.port = port;
    this.peak = peak;
  }
}