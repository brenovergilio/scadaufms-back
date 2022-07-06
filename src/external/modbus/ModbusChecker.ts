import MeasurerChecker from '@src/entities/interfaces/MeasurerChecker';
import ModbusRTU from 'modbus-serial';

export default class ModbusChecker implements MeasurerChecker {
  client: ModbusRTU;

  constructor() {
    this.client = new ModbusRTU();
  }

  async isOpen(ip: string, port: number): Promise<boolean> {
    let isOpen = true;
    try {
      await new Promise(async (resolve, reject) => {
        const connectionTimeoutID = setTimeout(() => reject(false), 5000);
        try {
          await this.client.connectTCP(ip, { port: port });
          clearTimeout(connectionTimeoutID);
          resolve(true);
        } catch {
          resolve(false);
        }
      });
    } catch (e) {
      isOpen = e;
    }

    return isOpen;
  }
}
