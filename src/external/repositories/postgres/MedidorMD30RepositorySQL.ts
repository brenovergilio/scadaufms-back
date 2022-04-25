import MedidorMD30 from '@src/entities/MedidorMD30';
import MedidorMD30Adapter from '@src/infra/adapters/MedidorMD30Adapter';
import MedidorMD30Repository from '@src/usecases/repositories/MedidorMD30Repository';
import db from '@src/external/database/postgres/database';

export default class MedidorMD30RepositorySQL implements MedidorMD30Repository {
  async addMedidorMD30(
    ip: string,
    name: string,
    port: number,
    peakHour: number,
    peakMinute: number,
    peakInterval: number
  ): Promise<MedidorMD30> {
    const medidorMD30Data = await db.one(
      'INSERT INTO medidores_md30 (ip, created_at, nome, porta, hora_ponta, minuto_ponta, intervalo_ponta) VALUES($1, NOW(), $2, $3, $4, $5, $6) RETURNING *',
      [ip, name, port, peakHour, peakMinute, peakInterval]
    );
    const medidorMD30: MedidorMD30 = MedidorMD30Adapter.create(
      medidorMD30Data.id,
      medidorMD30Data.ip,
      medidorMD30Data.nome,
      medidorMD30Data.porta,
      medidorMD30Data.hora_ponta,
      medidorMD30Data.minuto_ponta,
      medidorMD30Data.intervalo_ponta
    );
    return medidorMD30;
  }

  async getMedidorMD30ByID(id: number): Promise<MedidorMD30 | null> {
    const medidorMD30Data = await db.oneOrNone(
      'SELECT * FROM medidores_md30 WHERE id=$1',
      [id]
    );

    if (medidorMD30Data)
      return MedidorMD30Adapter.create(
        medidorMD30Data.id,
        medidorMD30Data.ip,
        medidorMD30Data.nome,
        medidorMD30Data.porta,
        medidorMD30Data.hora_ponta,
        medidorMD30Data.minuto_ponta,
        medidorMD30Data.intervalo_ponta
      );

    return null;
  }

  async getMedidorMD30ByIP(ip: string): Promise<MedidorMD30 | null> {
    const medidorMD30Data = await db.oneOrNone(
      'SELECT * FROM medidores_md30 WHERE ip=$1',
      [ip]
    );

    if (medidorMD30Data)
      return MedidorMD30Adapter.create(
        medidorMD30Data.id,
        medidorMD30Data.ip,
        medidorMD30Data.nome,
        medidorMD30Data.porta,
        medidorMD30Data.hora_ponta,
        medidorMD30Data.minuto_ponta,
        medidorMD30Data.intervalo_ponta
      );

    return null;
  }

  async getAllMedidoresMD30(): Promise<Array<MedidorMD30>> {
    const medidoresMD30Data = await db.manyOrNone(
      'SELECT * FROM medidores_md30 ORDER BY id'
    );
    const medidoresMD30 = medidoresMD30Data.map((medidor) =>
      MedidorMD30Adapter.create(
        medidor.id,
        medidor.ip,
        medidor.nome,
        medidor.porta,
        medidor.hora_ponta,
        medidor.minuto_ponta,
        medidor.intervalo_ponta
      )
    );
    return medidoresMD30;
  }

  async deleteMedidorMD30(id: number): Promise<MedidorMD30> {
    const medidorMD30Data = await db.one(
      'DELETE FROM medidores_md30 WHERE id=$1 RETURNING *',
      [id]
    );
    const medidorMD30: MedidorMD30 = MedidorMD30Adapter.create(
      medidorMD30Data.id,
      medidorMD30Data.ip,
      medidorMD30Data.nome,
      medidorMD30Data.porta,
      medidorMD30Data.hora_ponta,
      medidorMD30Data.minuto_ponta,
      medidorMD30Data.intervalo_ponta
    );
    return medidorMD30;
  }
}
