import MedidorMD30 from '@src/entities/MedidorMD30';

export default interface MedidorMD30Repository {
  addMedidorMD30(medidorMD30: MedidorMD30): Promise<MedidorMD30>;
  getMedidorMD30ByID(id: string): Promise<MedidorMD30 | null>;
  getMedidorMD30ByIP(ip: string): Promise<MedidorMD30 | null>;
  getAllMedidoresMD30(): Promise<Array<MedidorMD30>>;
  deleteMedidorMD30(id: string): Promise<MedidorMD30>;
}
