import MedicaoMD30 from '@src/entities/MedicaoMD30';
import MedicaoMD30Repository from '@src/entities/repositories/MedicaoMD30Repository';
import DateRange from '@src/usecases/util/DateRange';
import db from '@src/external/database/postgres/database';

export default class MedicaoMD30RepositorySQL implements MedicaoMD30Repository {
  async getTensoesPerDateRange(
    measurerID: number,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>> {
    const medicoesMD30Data = await db.manyOrNone(
      'SELECT timestamp, tensao_fase_a, tensao_fase_b, tensao_fase_c FROM medicoes_md30 WHERE medidor_id=$1 AND timestamp::date >= $2 AND timestamp::date <= $3 ORDER BY timestamp',
      [
        measurerID,
        dateRange.initialDate.toISOString().split('T')[0],
        dateRange.finalDate.toISOString().split('T')[0],
      ]
    );

    const medicoesMD30 = medicoesMD30Data.map((measurement) => {
      const keys = Object.keys(measurement).slice(1);
      const values = Object.values(measurement).slice(1) as Array<number>;
      const valuesMap = new Map<string, number>();
      keys.forEach((key, index) => valuesMap.set(key, values[index]));
      return new MedicaoMD30(
        measurerID,
        measurement.timestamp,
        valuesMap
      );
    });

    return medicoesMD30;
  }

  async getCorrentesPerDateRange(
    measurerID: number,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>> {
    const medicoesMD30Data = await db.manyOrNone(
      'SELECT timestamp, corrente_fase_a, corrente_fase_b, corrente_fase_c FROM medicoes_md30 WHERE medidor_id=$1 AND timestamp::date >= $2 AND timestamp::date <= $3 ORDER BY timestamp',
      [
        measurerID,
        dateRange.initialDate.toISOString().split('T')[0],
        dateRange.finalDate.toISOString().split('T')[0],
      ]
    );

    const medicoesMD30 = medicoesMD30Data.map((measurement) => {
      const keys = Object.keys(measurement).slice(1);
      const values = Object.values(measurement).slice(1) as Array<number>;
      const valuesMap = new Map<string, number>();
      keys.forEach((key, index) => valuesMap.set(key, values[index]));
      return new MedicaoMD30(
        measurerID,
        measurement.timestamp,
        valuesMap
      );
    });

    return medicoesMD30;
  }

  async getPotenciasAtivasPerDateRange(
    measurerID: number,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>> {
    const medicoesMD30Data = await db.manyOrNone(
      'SELECT timestamp, potencia_ativa_a, potencia_ativa_b, potencia_ativa_c, potencia_ativa_total FROM medicoes_md30 WHERE medidor_id=$1 AND timestamp::date >= $2 AND timestamp::date <= $3 ORDER BY timestamp',
      [
        measurerID,
        dateRange.initialDate.toISOString().split('T')[0],
        dateRange.finalDate.toISOString().split('T')[0],
      ]
    );

    const medicoesMD30 = medicoesMD30Data.map((measurement) => {
      const keys = Object.keys(measurement).slice(1);
      const values = Object.values(measurement).slice(1) as Array<number>;
      const valuesMap = new Map<string, number>();
      keys.forEach((key, index) => valuesMap.set(key, values[index]));
      return new MedicaoMD30(
        measurerID,
        measurement.timestamp,
        valuesMap
      );
    });

    return medicoesMD30;
  }

  async getPotenciasReativasPerDateRange(
    measurerID: number,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>> {
    const medicoesMD30Data = await db.manyOrNone(
      'SELECT timestamp, potencia_reativa_a, potencia_reativa_b, potencia_reativa_c, potencia_reativa_total FROM medicoes_md30 WHERE medidor_id=$1 AND timestamp::date >= $2 AND timestamp::date <= $3 ORDER BY timestamp',
      [
        measurerID,
        dateRange.initialDate.toISOString().split('T')[0],
        dateRange.finalDate.toISOString().split('T')[0],
      ]
    );

    const medicoesMD30 = medicoesMD30Data.map((measurement) => {
      const keys = Object.keys(measurement).slice(1);
      const values = Object.values(measurement).slice(1) as Array<number>;
      const valuesMap = new Map<string, number>();
      keys.forEach((key, index) => valuesMap.set(key, values[index]));
      return new MedicaoMD30(
        measurerID,
        measurement.timestamp,
        valuesMap
      );
    });

    return medicoesMD30;
  }

  async getPotenciasAparentesPerDateRange(
    measurerID: number,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>> {
    const medicoesMD30Data = await db.manyOrNone(
      'SELECT timestamp, potencia_aparente_a, potencia_aparente_b, potencia_aparente_c, potencia_aparente_total FROM medicoes_md30 WHERE medidor_id=$1 AND timestamp::date >= $2 AND timestamp::date <= $3 ORDER BY timestamp',
      [
        measurerID,
        dateRange.initialDate.toISOString().split('T')[0],
        dateRange.finalDate.toISOString().split('T')[0],
      ]
    );

    const medicoesMD30 = medicoesMD30Data.map((measurement) => {
      const keys = Object.keys(measurement).slice(1);
      const values = Object.values(measurement).slice(1) as Array<number>;
      const valuesMap = new Map<string, number>();
      keys.forEach((key, index) => valuesMap.set(key, values[index]));
      return new MedicaoMD30(
        measurerID,
        measurement.timestamp,
        valuesMap
      );
    });

    return medicoesMD30;
  }

  async getFatoresDePotenciaPerDateRange(
    measurerID: number,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>> {
    const medicoesMD30Data = await db.manyOrNone(
      'SELECT timestamp, fator_potencia_a, fator_potencia_b, fator_potencia_c, fator_potencia_total FROM medicoes_md30 WHERE medidor_id=$1 AND timestamp::date >= $2 AND timestamp::date <= $3 ORDER BY timestamp',
      [
        measurerID,
        dateRange.initialDate.toISOString().split('T')[0],
        dateRange.finalDate.toISOString().split('T')[0],
      ]
    );

    const medicoesMD30 = medicoesMD30Data.map((measurement) => {
      const keys = Object.keys(measurement).slice(1);
      const values = Object.values(measurement).slice(1) as Array<number>;
      const valuesMap = new Map<string, number>();
      keys.forEach((key, index) => valuesMap.set(key, values[index]));
      return new MedicaoMD30(
        measurerID,
        measurement.timestamp,
        valuesMap
      );
    });

    return medicoesMD30;
  }
}
