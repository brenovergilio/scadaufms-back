import MedidorMD30 from "@src/entities/MedidorMD30";
import MedidorMD30Adapter from "@src/infra/adapters/MedidorMD30Adapter";
import MedidorMD30Repository from "@src/usecases/repositories/MedidorMD30Repository";
import db from "@src/external/database/postgres/database";

export default class MedidorMD30RepositorySQL implements MedidorMD30Repository {
  async addMedidorMD30(ip: string, name: string, port: number, peakHour: number, peakMinute: number, peakInterval: number): Promise<void> {
    await db.none("INSERT INTO medidores VALUES($1, NOW(), $2, $3, $4, $5, $6)", [ip, name,  port, peakHour, peakMinute, peakInterval]);
  }

  async getMedidorMD30ByIP(ip: string): Promise<MedidorMD30> {
    const medidorMD30Data = await db.oneOrNone("SELECT * FROM medidores WHERE ip=$1", [ip]);
    return MedidorMD30Adapter.create(medidorMD30Data.ip, medidorMD30Data.nome, medidorMD30Data.porta, medidorMD30Data.hora_ponta, medidorMD30Data.minuto_ponta, medidorMD30Data.intervalo_ponta);
  }

  async getAllMedidoresMD30(): Promise<Array<MedidorMD30>> {
   const medidoresMD30Data = await db.manyOrNone("SELECT * FROM medidores");
   const medidoresMD30 = medidoresMD30Data.map((medidor) => MedidorMD30Adapter.create(medidor.ip, medidor.nome, medidor.porta, medidor.hora_ponta, medidor.minuto_ponta, medidor.intervalo_ponta));
   return medidoresMD30; 
  }

  async deleteMedidorMD30(ip: string): Promise<void> {
    await db.none("DELETE FROM medidores WHERE ip=$1", [ip]);
  }
}