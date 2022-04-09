import Measurer from './interfaces/Measurer';
import Rush from './interfaces/Rush';
import { validateMedidorMD30Params } from './util/EntityFieldsValidators';

export default class MedidorMD30 implements Measurer {
  id: number;
  ip: string;
  name: string;
  port: number;
  rush: Rush;

  constructor(
    id: number,
    ip: string,
    name: string,
    port: number,
    rush: Rush = { hour: 17, minute: 30, interval: 3 }
  ) {
    validateMedidorMD30Params(ip, name, port, rush);

    this.id = id;
    this.ip = ip;
    this.name = name;
    this.port = port;
    this.rush = rush;
  }
}
