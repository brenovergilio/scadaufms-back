import MedidorMD30 from "@src/entities/MedidorMD30";
import MedidorMD30Adapter from "@src/infra/adapters/MedidorMD30Adapter";
import MedidorMD30Repository from "@src/usecases/repositories/MedidorMD30Repository";
import db from "../database/postgres/database";

export class MedidorMD30RepositorySQL implements MedidorMD30Repository {
  async addMedidorMD30(ip: string, name: string, port: number, peakHour: number, peakMinute: number, peakInterval: number): Promise<void> {
    await db.none("INSERT INTO medidores VALUES($1, $2, $3, $4, $5, $6)", [ip, name,  port, peakHour, peakMinute, peakInterval]);
  }

  async getMedidorMD30ByIP(ip: string): Promise<MedidorMD30> {
    const medidorMD30Data = await db.oneOrNone("SELECT * FROM medidores WHERE ip=$1", [ip]);
    return MedidorMD30Adapter.create(medidorMD30Data.ip, medidorMD30Data.nome, medidorMD30Data.porta, medidorMD30Data.hora_pico, medidorMD30Data.minuto_pico, medidorMD30Data.intervalo_pico);
  }

  async getAllMedidoresMD30(): Promise<Array<MedidorMD30>> {
   const medidoresMD30Data = await db.manyOrNone("SELECT * FROM medidores");
   const medidoresMD30 = medidoresMD30Data.map((medidor) => MedidorMD30Adapter.create(medidor.ip, medidor.nome, medidor.porta, medidor.hora_pico, medidor.minuto_pico, medidor.intervalo_pico));
   return medidoresMD30; 
  }
}