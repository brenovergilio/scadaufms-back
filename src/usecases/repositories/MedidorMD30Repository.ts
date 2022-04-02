import MedidorMD30 from "@src/entities/MedidorMD30";

export default interface MedidorMD30Repository {
  addMedidorMD30(ip: string, name: string, port: number, peakHour: number, peakMinute: number, peakInterval: number): void;
  getMedidorMD30ByIP(ip: string): Promise<MedidorMD30>;
  getAllMedidoresMD30(): Promise<Array<MedidorMD30>>;
}