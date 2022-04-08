import Peak from "@src/entities/interfaces/Peak";
import MedidorMD30 from "@src/entities/MedidorMD30";

export default class MedidorMD30Adapter {
  static create(id: number, ip: string, name: string, port: number, peakHour: number, peakMinute: number, peakInterval: number) {
    const peak: Peak = {hour: peakHour, minute: peakMinute, interval: peakInterval};
    return new MedidorMD30(id, ip, name, port, peak);
  }
}