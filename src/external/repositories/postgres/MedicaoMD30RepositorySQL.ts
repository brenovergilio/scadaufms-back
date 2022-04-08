import MedicaoMD30 from "@src/entities/MedicaoMD30";
import MedicaoMD30Adapter from "@src/infra/adapters/MedicaoMD30Adapter";
import MedicaoMD30Repository from "@src/usecases/repositories/MedicaoMD30Repository";
import DateRange from "@src/usecases/util/DateRange";
import db from "@src/external/database/postgres/database";

export default class MedicaoMD30RepositorySQL implements MedicaoMD30Repository {
  //@ForAll AND timestamp >= $2 AND timestamp <= $3 

  async getTensoesPerDateRange(measurerID: number): Promise<Array<MedicaoMD30>> {
    const medicoesMD30Data = await db.manyOrNone("SELECT timestamp, tensao_fase_a, tensao_fase_b, tensao_fase_c FROM medicoes WHERE medidor_id=$1 ORDER BY timestamp", [measurerID]);

    const medicoesMD30 = medicoesMD30Data.map((measurement) => {
      const keys = Object.keys(measurement).slice(1);
      const values = Object.values(measurement).slice(1) as Array<number>;
      return MedicaoMD30Adapter.create(measurerID, measurement.timestamp, keys, values);
    });

    return medicoesMD30;
  }
  
  async getCorrentesPerDateRange(measurerID: number): Promise<Array<MedicaoMD30>> {
    const medicoesMD30Data = await db.manyOrNone("SELECT timestamp, corrente_fase_a, corrente_fase_b, corrente_fase_c FROM medicoes WHERE medidor_id=$1 ORDER BY timestamp", [measurerID]);

    const medicoesMD30 = medicoesMD30Data.map((measurement) => {
      const keys = Object.keys(measurement).slice(1);
      const values = Object.values(measurement).slice(1) as Array<number>;
      return MedicaoMD30Adapter.create(measurerID, measurement.timestamp, keys, values);
    });

    return medicoesMD30;
  }

  async getPotenciasAtivasPerDateRange(measurerID: number): Promise<Array<MedicaoMD30>> {
    const medicoesMD30Data = await db.manyOrNone("SELECT timestamp, potencia_ativa_a, potencia_ativa_b, potencia_ativa_c, potencia_ativa_total FROM medicoes WHERE medidor_id=$1 ORDER BY timestamp", [measurerID]);

    const medicoesMD30 = medicoesMD30Data.map((measurement) => {
      const keys = Object.keys(measurement).slice(1);
      const values = Object.values(measurement).slice(1) as Array<number>;
      return MedicaoMD30Adapter.create(measurerID, measurement.timestamp, keys, values);
    });

    return medicoesMD30;
  }

  async getPotenciasReativasPerDateRange(measurerID: number): Promise<Array<MedicaoMD30>> {
    const medicoesMD30Data = await db.manyOrNone("SELECT timestamp, potencia_reativa_a, potencia_reativa_b, potencia_reativa_c, potencia_reativa_total FROM medicoes WHERE medidor_id=$1 ORDER BY timestamp", [measurerID]);

    const medicoesMD30 = medicoesMD30Data.map((measurement) => {
      const keys = Object.keys(measurement).slice(1);
      const values = Object.values(measurement).slice(1) as Array<number>;
      return MedicaoMD30Adapter.create(measurerID, measurement.timestamp, keys, values);
    });

    return medicoesMD30;
  }

  async getPotenciasAparentesPerDateRange(measurerID: number): Promise<Array<MedicaoMD30>> {
    const medicoesMD30Data = await db.manyOrNone("SELECT timestamp, potencia_aparente_a, potencia_aparente_b, potencia_aparente_c, potencia_aparente_total FROM medicoes WHERE medidor_id=$1 ORDER BY timestamp", [measurerID]);

    const medicoesMD30 = medicoesMD30Data.map((measurement) => {
      const keys = Object.keys(measurement).slice(1);
      const values = Object.values(measurement).slice(1) as Array<number>;
      return MedicaoMD30Adapter.create(measurerID, measurement.timestamp, keys, values);
    });

    return medicoesMD30;
  }

  async getFatoresDePotenciaPerDateRange(measurerID: number): Promise<Array<MedicaoMD30>> {
    const medicoesMD30Data = await db.manyOrNone("SELECT timestamp, fator_potencia_a, fator_potencia_b, fator_potencia_c, fator_potencia_total FROM medicoes WHERE medidor_id=$1 ORDER BY timestamp", [measurerID]);
  
    const medicoesMD30 = medicoesMD30Data.map((measurement) => {
      const keys = Object.keys(measurement).slice(1);
      const values = Object.values(measurement).slice(1) as Array<number>;
      return MedicaoMD30Adapter.create(measurerID, measurement.timestamp, keys, values);
    });

    return medicoesMD30;
  }
}