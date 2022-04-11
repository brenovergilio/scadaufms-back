import MeasurerChecker from "@src/entities/interfaces/MeasurerChecker";
import ModbusRTU from "modbus-serial";

export default class ModbusChecker implements MeasurerChecker {

  client: ModbusRTU;

  constructor() {
    this.client = new ModbusRTU();
  }

  async isOpen(ip: string, port: number): Promise<boolean> {
      try {
        await this.client.connectTCP(ip, { port: port });
        return true;
      } catch {
        return false;
      } finally {
        this.client.close(() => console.log("TCP connection closed"));
      }
  }
}