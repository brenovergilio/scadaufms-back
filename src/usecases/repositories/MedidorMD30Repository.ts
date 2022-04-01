import MedidorMD30 from "@src/entities/MedidorMD30";

export default interface MedidorMD30Repository {
  addMedidorMD30(ip: string, name: string, port: number): void;
  getMedidorMD30ByIP(ip: string): MedidorMD30;
  getAllMedidoresMD30(): Array<MedidorMD30>;
}