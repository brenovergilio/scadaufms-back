import MedidorMD30 from '@src/entities/MedidorMD30';

export default interface MedidorMD30Repository {
  addMedidorMD30(
    ip: string,
    name: string,
    port: number,
    peakHour: number,
    peakMinute: number,
    peakInterval: number
  ): Promise<MedidorMD30>;
  getMedidorMD30ByID(id: number): Promise<MedidorMD30 | null>;
  getMedidorMD30ByIP(ip: string): Promise<MedidorMD30 | null>;
  getAllMedidoresMD30(): Promise<Array<MedidorMD30>>;
  deleteMedidorMD30(id: number): Promise<MedidorMD30>;
}
