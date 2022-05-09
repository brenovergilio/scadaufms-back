import MedidorMD30 from '@src/entities/MedidorMD30';
import MedidorMD30Repository from '@src/entities/repositories/MedidorMD30Repository';
import db from '@src/external/database/postgres/database';

export default class MedidorMD30RepositorySQL implements MedidorMD30Repository {
  async addMedidorMD30(
    ip: string,
    name: string,
    port: number,
    rushHour: number,
    rushMinute: number,
    rushInterval: number
  ): Promise<MedidorMD30> {
    const medidorMD30Data = await db.one(
      'INSERT INTO medidores_md30 (ip, created_at, nome, porta, hora_ponta, minuto_ponta, intervalo_ponta) VALUES($1, NOW(), $2, $3, $4, $5, $6) RETURNING *',
      [ip, name, port, rushHour, rushMinute, rushInterval]
    );
    const medidorMD30: MedidorMD30 = new MedidorMD30(
      medidorMD30Data.id,
      medidorMD30Data.ip,
      medidorMD30Data.nome,
      medidorMD30Data.porta,
      { hour: medidorMD30Data.hora_ponta, minute: medidorMD30Data.minuto_ponta, interval: medidorMD30Data.intervalo_ponta }
    );
    return medidorMD30;
  }

  async getMedidorMD30ByID(id: number): Promise<MedidorMD30 | null> {
    const medidorMD30Data = await db.oneOrNone(
      'SELECT * FROM medidores_md30 WHERE id=$1',
      [id]
    );

    if (medidorMD30Data)
      return new MedidorMD30(
        medidorMD30Data.id,
        medidorMD30Data.ip,
        medidorMD30Data.nome,
        medidorMD30Data.porta,
        { hour: medidorMD30Data.hora_ponta, minute: medidorMD30Data.minuto_ponta, interval: medidorMD30Data.intervalo_ponta }
      );

    return null;
  }

  async getMedidorMD30ByIP(ip: string): Promise<MedidorMD30 | null> {
    const medidorMD30Data = await db.oneOrNone(
      'SELECT * FROM medidores_md30 WHERE ip=$1',
      [ip]
    );

    if (medidorMD30Data)
      return new MedidorMD30(
        medidorMD30Data.id,
        medidorMD30Data.ip,
        medidorMD30Data.nome,
        medidorMD30Data.porta,
        { hour: medidorMD30Data.hora_ponta, minute: medidorMD30Data.minuto_ponta, interval: medidorMD30Data.intervalo_ponta }
      );

    return null;
  }

  async getAllMedidoresMD30(): Promise<Array<MedidorMD30>> {
    const medidoresMD30Data = await db.manyOrNone(
      'SELECT * FROM medidores_md30 ORDER BY id'
    );
    const medidoresMD30 = medidoresMD30Data.map((medidor) =>
      new MedidorMD30(
        medidor.id,
        medidor.ip,
        medidor.nome,
        medidor.porta,
        { hour: medidor.hora_ponta, minute: medidor.minuto_ponta, interval: medidor.intervalo_ponta }
      )
    );
    return medidoresMD30;
  }

  async deleteMedidorMD30(id: number): Promise<MedidorMD30> {
    const medidorMD30Data = await db.one(
      'DELETE FROM medidores_md30 WHERE id=$1 RETURNING *',
      [id]
    );
    const medidorMD30: MedidorMD30 = new MedidorMD30(
      medidorMD30Data.id,
      medidorMD30Data.ip,
      medidorMD30Data.nome,
      medidorMD30Data.porta,
      { hour: medidorMD30Data.hora_ponta, minute: medidorMD30Data.minuto_ponta, interval: medidorMD30Data.intervalo_ponta }
    );
    return medidorMD30;
  }
}
