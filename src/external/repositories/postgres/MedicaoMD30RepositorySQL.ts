import MedicaoMD30 from '@src/entities/MedicaoMD30';
import MedicaoMD30Repository from '@src/entities/repositories/MedicaoMD30Repository';
import DateRange from '@src/usecases/util/DateRange';
import db from '@src/external/database/postgres/database';

export default class MedicaoMD30RepositorySQL implements MedicaoMD30Repository {
  async getTensoesPerDateRange(
    measurerID: string,
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
      keys.forEach((key, index) => valuesMap.set(`${this.formatMeasurementKey(key)} (V)`, values[index]));
      return new MedicaoMD30(measurerID, this.formatDate(measurement.timestamp), valuesMap);
    });

    return medicoesMD30;
  }

  async getCorrentesPerDateRange(
    measurerID: string,
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
      keys.forEach((key, index) => valuesMap.set(`${this.formatMeasurementKey(key)} (A)`, values[index]));
      return new MedicaoMD30(measurerID, this.formatDate(measurement.timestamp), valuesMap);
    });

    return medicoesMD30;
  }

  async getPotenciasAtivasPerDateRange(
    measurerID: string,
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
      keys.forEach((key, index) => valuesMap.set(`${this.formatMeasurementKey(key)} (kW)`, values[index]/1000));
      return new MedicaoMD30(measurerID, this.formatDate(measurement.timestamp), valuesMap);
    });

    return medicoesMD30;
  }

  async getPotenciasReativasPerDateRange(
    measurerID: string,
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
      keys.forEach((key, index) => valuesMap.set(`${this.formatMeasurementKey(key)} (KVAr)`, values[index]/1000));
      return new MedicaoMD30(measurerID, this.formatDate(measurement.timestamp), valuesMap);
    });

    return medicoesMD30;
  }

  async getPotenciasAparentesPerDateRange(
    measurerID: string,
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
      keys.forEach((key, index) => valuesMap.set(`${this.formatMeasurementKey(key)} (kVA)`, values[index]));
      return new MedicaoMD30(measurerID, this.formatDate(measurement.timestamp), valuesMap);
    });

    return medicoesMD30;
  }

  async getFatoresDePotenciaPerDateRange(
    measurerID: string,
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
      keys.forEach((key, index) => valuesMap.set(`${this.formatMeasurementKey(key)}`, values[index]));
      return new MedicaoMD30(measurerID, this.formatDate(measurement.timestamp), valuesMap);
    });

    return medicoesMD30;
  }

  private formatMeasurementKey(key: string): string {
    const splittedKey = key.replaceAll("_", " ").split(" ");
    for (var i = 0; i < splittedKey.length; i++) {
      splittedKey[i] = splittedKey[i].charAt(0).toUpperCase() + splittedKey[i].slice(1);
    }
    return splittedKey.join(" ");
  }

  private formatDate(date: string): string {
    const regex = /^([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])\s*([0-9]{2}):([0-9]{2}):([0-9]{2}).*/;
    const pieces = regex.exec(date);
    if(pieces === null) return "";
    const [full, year, month, day, hour, minute, second] = pieces;
    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  }
}
