import Measurer from "./interfaces/Measurer";
import Peak from "./interfaces/Peak";
import { validateMedidorMD30Params } from "./util/EntityFieldsValidators";

export default class MedidorMD30 implements Measurer {
  id: number;
  ip: string;
  name: string;
  port: number;
  peak: Peak;

  constructor(id: number, ip: string, name: string, port: number, peak: Peak = {hour: 17, minute: 30, interval: 3}) {
    validateMedidorMD30Params(ip, name, port, peak);
    
    this.id = id;
    this.ip = ip;
    this.name = name;
    this.port = port;
    this.peak = peak;
  }
}