import MedicaoMD30 from '@src/entities/MedicaoMD30';
import MedicaoMD30Repository from '@src/entities/repositories/MedicaoMD30Repository';
import DateRange from '@src/usecases/util/DateRange';
import db from '@src/external/database/postgres/database';

export default class MedicaoMD30RepositorySQL implements MedicaoMD30Repository {
  getPotenciasAparentesPerDateRange(measurerID: string, dateRange: DateRange): Promise<MedicaoMD30[]> {
    throw new Error('Method not implemented.');
  }
  // async getConsumosAtivosPerMonthAndYear(
  //   measurerID: string,
  //   month: number,
  //   year: number
  // ): Promise<Array<MedicaoMD30>> {
  //   const medicoesMD30Data = await db.manyOrNone(
  //     "SELECT to_timestamp(FLOOR(extract('epoch' FROM timestamp::timestamptz) / $1) * $1) AS interval, AVG(potencia_ativa_total) FROM medicoes_md30 WHERE medidor_id=$2 AND EXTRACT(MONTH FROM to_timestamp(FLOOR(extract('epoch' FROM timestamp::timestamptz) / $1) * $1)) = $3 AND EXTRACT(YEAR FROM to_timestamp(FLOOR(extract('epoch' FROM timestamp::timestamptz) / $1) * $1)) = $4 GROUP BY interval ORDER BY interval;",
  //     [
  //       interval,
  //       measurerID,
  //       month,
  //       year,
  //     ]
  //   );

  //   const medicoesMD30 = medicoesMD30Data.map((measurement) => {
  //     const keys = Object.keys(measurement).slice(1);
  //     const values = Object.values(measurement).slice(1) as Array<number>;
  //     const valuesMap = new Map<string, number>();
  //     keys.forEach((key, index) =>
  //       valuesMap.set('Consumo Ativo (kWh)', values[index] / 1000)
  //     );
  //     const timestamp = this.formatDate(
  //       measurement.interval.toISOString().replace('T', ' ')
  //     );
  //     return new MedicaoMD30(measurerID, timestamp, valuesMap);
  //   });
  //   console.log(medicoesMD30);
  //   return medicoesMD30;
  // }

  async getConsumosAtivosPerDateRange(
    measurerID: string,
    interval: number,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>> {
    const medicoesMD30Data = await db.manyOrNone(
      "SELECT to_timestamp(FLOOR(extract('epoch' FROM timestamp::timestamptz) / $1) * $1) AS interval, AVG(potencia_ativa_total) FROM medicoes_md30 WHERE medidor_id=$2 AND to_timestamp(FLOOR(extract('epoch' FROM timestamp::timestamptz) / $1) * $1) >= ($3::DATE + (15 || ' minutes')::INTERVAL) AND to_timestamp(FLOOR(extract('epoch' FROM timestamp::timestamptz) / $1) * $1) <= ($4::DATE + (1455 || ' minutes')::INTERVAL) GROUP BY interval ORDER BY interval;",
      [
        interval,
        measurerID,
        dateRange.initialDate.toISOString().split('T')[ 0 ],
        dateRange.finalDate.toISOString().split('T')[ 0 ],
      ]
    );

    // Número que vai dividir todo o resultado de medicoesMD30Array para obter o consumo proporcional a uma hora
    const divideBy = 3600 / interval;

    const medicoesMD30 = medicoesMD30Data.map((measurement) => {
      const keys = Object.keys(measurement).slice(1);
      const values = Object.values(measurement).slice(1) as Array<number>;
      const valuesMap = new Map<string, number>();
      keys.forEach((key, index) =>
        valuesMap.set('Consumo Ativo (kWh)', values[ index ] / 1000 / divideBy)
      );
      const timestamp = this.formatDate(
        measurement.interval.toISOString().replace('T', ' ')
      );
      return new MedicaoMD30(measurerID, timestamp, valuesMap);
    });
    return medicoesMD30;
  }

  // async getConsumosReativosPerMonthAndYear(
  //   measurerID: string,
  //   month: number,
  //   year: number
  // ): Promise<Array<MedicaoMD30>> {
  //   const medicoesMD30Data = await db.manyOrNone(
  //     "SELECT to_timestamp(FLOOR(extract('epoch' FROM timestamp::timestamptz) / $1) * $1) AS interval, AVG(potencia_reativa_total) FROM medicoes_md30 WHERE medidor_id=$2 AND EXTRACT(MONTH FROM to_timestamp(FLOOR(extract('epoch' FROM timestamp::timestamptz) / $1) * $1)) = $3 AND EXTRACT(YEAR FROM to_timestamp(FLOOR(extract('epoch' FROM timestamp::timestamptz) / $1) * $1)) = $4 GROUP BY interval ORDER BY interval;",
  //     [
  //       interval,
  //       measurerID,
  //       month,
  //       year,
  //     ]
  //   );

  //   const medicoesMD30 = medicoesMD30Data.map((measurement) => {
  //     const keys = Object.keys(measurement).slice(1);
  //     const values = Object.values(measurement).slice(1) as Array<number>;
  //     const valuesMap = new Map<string, number>();
  //     keys.forEach((key, index) =>
  //       valuesMap.set('Consumo Reativo (kVarh)', values[index] / 1000)
  //     );
  //     const timestamp = this.formatDate(
  //       measurement.interval.toISOString().replace('T', ' ')
  //     );
  //     return new MedicaoMD30(measurerID, timestamp, valuesMap);
  //   });
  //   console.log(medicoesMD30);
  //   return medicoesMD30;
  // }

  async getConsumosReativosPerDateRange(
    measurerID: string,
    interval: number,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>> {
    const medicoesMD30Data = await db.manyOrNone(
      "SELECT to_timestamp(FLOOR(extract('epoch' FROM timestamp::timestamptz) / $1) * $1) AS interval, AVG(potencia_reativa_total) FROM medicoes_md30 WHERE medidor_id=$2 AND to_timestamp(FLOOR(extract('epoch' FROM timestamp::timestamptz) / $1) * $1) >= ($3::DATE + (15 || ' minutes')::INTERVAL) AND to_timestamp(FLOOR(extract('epoch' FROM timestamp::timestamptz) / $1) * $1) <= ($4::DATE + (1455 || ' minutes')::INTERVAL) GROUP BY interval ORDER BY interval;",
      [
        interval,
        measurerID,
        dateRange.initialDate.toISOString().split('T')[ 0 ],
        dateRange.finalDate.toISOString().split('T')[ 0 ],
      ]
    );

    // Número que vai dividir todo o resultado de medicoesMD30Array para obter o consumo proporcional a uma hora
    const divideBy = 3600 / interval;

    const medicoesMD30 = medicoesMD30Data.map((measurement) => {
      const keys = Object.keys(measurement).slice(1);
      const values = Object.values(measurement).slice(1) as Array<number>;
      const valuesMap = new Map<string, number>();
      keys.forEach((key, index) =>
        valuesMap.set('Consumo Reativo (kVarh)', values[ index ] / 1000 / divideBy)
      );
      return new MedicaoMD30(
        measurerID,
        this.formatDate(measurement.interval.toISOString().replace('T', ' ')),
        valuesMap
      );
    });

    return medicoesMD30;
  }

  async getDemandasAtivasPerDateRange(
    measurerID: string,
    interval: number,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>> {
    const medicoesMD30Data = await db.manyOrNone(
      "SELECT to_timestamp(FLOOR(extract('epoch' FROM timestamp::timestamptz) / $1) * $1) AS interval, MAX(potencia_ativa_total) FROM medicoes_md30 WHERE medidor_id=$2 AND to_timestamp(FLOOR(extract('epoch' FROM timestamp::timestamptz) / $1) * $1) >= ($3::DATE + (15 || ' minutes')::INTERVAL) AND to_timestamp(FLOOR(extract('epoch' FROM timestamp::timestamptz) / $1) * $1) <= ($4::DATE + (1455 || ' minutes')::INTERVAL) GROUP BY interval ORDER BY interval",
      [
        interval,
        measurerID,
        dateRange.initialDate.toISOString().split('T')[ 0 ],
        dateRange.finalDate.toISOString().split('T')[ 0 ],
      ]
    );
    const medicoesMD30 = medicoesMD30Data.map((measurement) => {
      const keys = Object.keys(measurement).slice(1);
      const values = Object.values(measurement).slice(1) as Array<number>;
      const valuesMap = new Map<string, number>();
      keys.forEach((key, index) =>
        valuesMap.set('Demanda Ativa (kV)', values[ index ] / 1000)
      );
      return new MedicaoMD30(
        measurerID,
        this.formatDate(measurement.interval.toISOString().replace('T', ' ')),
        valuesMap
      );
    });

    return medicoesMD30;
  }
  async getDemandasReativasPerDateRange(
    measurerID: string,
    interval: number,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>> {
    const medicoesMD30Data = await db.manyOrNone(
      "SELECT to_timestamp(FLOOR(extract('epoch' FROM timestamp::timestamptz) / $1) * $1) AS interval, MAX(potencia_reativa_total) FROM medicoes_md30 WHERE medidor_id=$2 AND to_timestamp(FLOOR(extract('epoch' FROM timestamp::timestamptz) / $1) * $1) >= ($3::DATE + (15 || ' minutes')::INTERVAL) AND to_timestamp(FLOOR(extract('epoch' FROM timestamp::timestamptz) / $1) * $1) <= ($4::DATE + (1455 || ' minutes')::INTERVAL) GROUP BY interval ORDER BY interval",
      [
        interval,
        measurerID,
        dateRange.initialDate.toISOString().split('T')[ 0 ],
        dateRange.finalDate.toISOString().split('T')[ 0 ],
      ]
    );

    const medicoesMD30 = medicoesMD30Data.map((measurement) => {
      const keys = Object.keys(measurement).slice(1);
      const values = Object.values(measurement).slice(1) as Array<number>;
      const valuesMap = new Map<string, number>();
      keys.forEach((key, index) =>
        valuesMap.set('Demanda Reativa (kVar)', values[ index ] / 1000)
      );
      return new MedicaoMD30(
        measurerID,
        this.formatDate(measurement.interval.toISOString().replace('T', ' ')),
        valuesMap
      );
    });

    return medicoesMD30;
  }

  async getAllMedicoesPerDateRange(
    measurerID: string,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>> {
    const medicoesMD30Data = await db.manyOrNone(
      "SELECT timestamp, tensao_fase_a, tensao_fase_b, tensao_fase_c, corrente_fase_a, corrente_fase_b, corrente_fase_c, potencia_ativa_total, potencia_reativa_total FROM medicoes_md30 WHERE medidor_id=$1 AND timestamp >= ($2::DATE + (15 || ' minutes')::INTERVAL) AND timestamp <= ($3::DATE + (1455 || ' minutes')::INTERVAL) ORDER BY timestamp",
      [
        measurerID,
        dateRange.initialDate.toISOString().split('T')[ 0 ],
        dateRange.finalDate.toISOString().split('T')[ 0 ],
      ]
    );
    const medicoesMD30 = medicoesMD30Data.map((measurement) => {
      const keys = Object.keys(measurement).slice(1);
      const values = Object.values(measurement).slice(1) as Array<number>;
      const valuesMap = new Map<string, number>();
      keys.forEach((key, index) => {
        if (key.includes('tensao'))
          valuesMap.set(`${this.formatMeasurementKey(key)} (V)`, values[ index ])
        else if (key.includes('corrente'))
          valuesMap.set(`${this.formatMeasurementKey(key)} (A)`, values[ index ])
        else if (key.includes('potencia_ativa'))
          valuesMap.set(`${this.formatMeasurementKey(key)} (kW)`, values[ index ] / 1000)
        else if (key.includes('potencia_reativa'))
          valuesMap.set(`${this.formatMeasurementKey(key)} (kVAr)`, values[ index ] / 1000)
      });
      return new MedicaoMD30(
        measurerID,
        this.formatDate(measurement.timestamp),
        valuesMap
      );
    });
    return medicoesMD30;
  }

  async getTensoesPerDateRange(
    measurerID: string,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>> {
    const medicoesMD30Data = await db.manyOrNone(
      "SELECT timestamp, tensao_fase_a, tensao_fase_b, tensao_fase_c FROM medicoes_md30 WHERE medidor_id=$1 AND timestamp >= ($2::DATE + (15 || ' minutes')::INTERVAL) AND timestamp <= ($3::DATE + (1455 || ' minutes')::INTERVAL) ORDER BY timestamp",
      [
        measurerID,
        dateRange.initialDate.toISOString().split('T')[ 0 ],
        dateRange.finalDate.toISOString().split('T')[ 0 ],
      ]
    );
    const medicoesMD30 = medicoesMD30Data.map((measurement) => {
      const keys = Object.keys(measurement).slice(1);
      const values = Object.values(measurement).slice(1) as Array<number>;
      const valuesMap = new Map<string, number>();
      keys.forEach((key, index) =>
        valuesMap.set(`${this.formatMeasurementKey(key)} (V)`, values[ index ])
      );
      return new MedicaoMD30(
        measurerID,
        this.formatDate(measurement.timestamp),
        valuesMap
      );
    });
    return medicoesMD30;
  }


  async getCorrentesPerDateRange(
    measurerID: string,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>> {
    const medicoesMD30Data = await db.manyOrNone(
      "SELECT timestamp, corrente_fase_a, corrente_fase_b, corrente_fase_c FROM medicoes_md30 WHERE medidor_id=$1 AND timestamp >= ($2::DATE + (15 || ' minutes')::INTERVAL) AND timestamp <= ($3::DATE + (1455 || ' minutes')::INTERVAL) ORDER BY timestamp",
      [
        measurerID,
        dateRange.initialDate.toISOString().split('T')[ 0 ],
        dateRange.finalDate.toISOString().split('T')[ 0 ],
      ]
    );

    const medicoesMD30 = medicoesMD30Data.map((measurement) => {
      const keys = Object.keys(measurement).slice(1);
      const values = Object.values(measurement).slice(1) as Array<number>;
      const valuesMap = new Map<string, number>();
      keys.forEach((key, index) =>
        valuesMap.set(`${this.formatMeasurementKey(key)} (A)`, values[ index ])
      );
      return new MedicaoMD30(
        measurerID,
        this.formatDate(measurement.timestamp),
        valuesMap
      );
    });

    return medicoesMD30;
  }

  async getPotenciasAtivasPerDateRange(
    measurerID: string,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>> {
    const medicoesMD30Data = await db.manyOrNone(
      "SELECT timestamp, potencia_ativa_total FROM medicoes_md30 WHERE medidor_id=$1 AND timestamp >= ($2::DATE + (15 || ' minutes')::INTERVAL) AND timestamp <= ($3::DATE + (1455 || ' minutes')::INTERVAL) ORDER BY timestamp",
      [
        measurerID,
        dateRange.initialDate.toISOString().split('T')[ 0 ],
        dateRange.finalDate.toISOString().split('T')[ 0 ],
      ]
    );

    const medicoesMD30 = medicoesMD30Data.map((measurement) => {
      const keys = Object.keys(measurement).slice(1);
      const values = Object.values(measurement).slice(1) as Array<number>;
      const valuesMap = new Map<string, number>();
      keys.forEach((key, index) =>
        valuesMap.set(
          `${this.formatMeasurementKey(key)} (kW)`,
          values[ index ] / 1000
        )
      );
      return new MedicaoMD30(
        measurerID,
        this.formatDate(measurement.timestamp),
        valuesMap
      );
    });

    return medicoesMD30;
  }

  async getPotenciasReativasPerDateRange(
    measurerID: string,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>> {
    const medicoesMD30Data = await db.manyOrNone(
      "SELECT timestamp, potencia_reativa_total FROM medicoes_md30 WHERE medidor_id=$1 AND timestamp >= ($2::DATE + (15 || ' minutes')::INTERVAL) AND timestamp <= ($3::DATE + (1455 || ' minutes')::INTERVAL) ORDER BY timestamp",
      [
        measurerID,
        dateRange.initialDate.toISOString().split('T')[ 0 ],
        dateRange.finalDate.toISOString().split('T')[ 0 ],
      ]
    );

    const medicoesMD30 = medicoesMD30Data.map((measurement) => {
      const keys = Object.keys(measurement).slice(1);
      const values = Object.values(measurement).slice(1) as Array<number>;
      const valuesMap = new Map<string, number>();
      keys.forEach((key, index) =>
        valuesMap.set(
          `${this.formatMeasurementKey(key)} (KVAr)`,
          values[ index ] / 1000
        )
      );
      return new MedicaoMD30(
        measurerID,
        this.formatDate(measurement.timestamp),
        valuesMap
      );
    });

    return medicoesMD30;
  }

  async getFatoresDePotenciaPerDateRange(
    measurerID: string,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>> {
    const medicoesMD30Data = await db.manyOrNone(
      "SELECT timestamp, fator_potencia_total FROM medicoes_md30 WHERE medidor_id=$1 AND timestamp >= ($2::DATE + (15 || ' minutes')::INTERVAL) AND timestamp <= ($3::DATE + (1455 || ' minutes')::INTERVAL) ORDER BY timestamp",
      [
        measurerID,
        dateRange.initialDate.toISOString().split('T')[ 0 ],
        dateRange.finalDate.toISOString().split('T')[ 0 ],
      ]
    );

    const medicoesMD30 = medicoesMD30Data.map((measurement) => {
      const keys = Object.keys(measurement).slice(1);
      const values = Object.values(measurement).slice(1) as Array<number>;
      const valuesMap = new Map<string, number>();
      keys.forEach((key, index) =>
        valuesMap.set(`${this.formatMeasurementKey(key)}`, values[ index ])
      );
      return new MedicaoMD30(
        measurerID,
        this.formatDate(measurement.timestamp),
        valuesMap
      );
    });
    return medicoesMD30;
  }

  private formatMeasurementKey(key: string): string {
    const splittedKey = key.replaceAll('_', ' ').split(' ');
    for (var i = 0; i < splittedKey.length; i++) {
      splittedKey[ i ] =
        splittedKey[ i ].charAt(0).toUpperCase() + splittedKey[ i ].slice(1);
    }
    return splittedKey.join(' ');
  }

  private formatDate(date: string): string {
    const regex =
      /^([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])\s*([0-9]{2}):([0-9]{2}):([0-9]{2}).*/;
    const pieces = regex.exec(date);
    if (pieces === null) return '';
    const [ full, year, month, day, hour, minute, second ] = pieces;
    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  }
}
