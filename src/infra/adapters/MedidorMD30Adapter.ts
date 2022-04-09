import Rush from '@src/entities/interfaces/Rush';
import MedidorMD30 from '@src/entities/MedidorMD30';

export default class MedidorMD30Adapter {
  static create(
    id: number,
    ip: string,
    name: string,
    port: number,
    rushHour: number,
    rushMinute: number,
    rushInterval: number
  ) {
    const rush: Rush = {
      hour: rushHour,
      minute: rushMinute,
      interval: rushInterval,
    };
    return new MedidorMD30(id, ip, name, port, rush);
  }
}
