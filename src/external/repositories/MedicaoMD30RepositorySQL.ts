import MedicaoMD30 from "@src/entities/MedicaoMD30";
import MedicaoMD30Adapter from "@src/infra/adapters/MedicaoMD30Adapter";
import MedicaoMD30Repository from "@src/usecases/repositories/MedicaoMD30Repository";
import DateRange from "@src/usecases/util/DateRange";
import db from "../database/postgres/database";

export default class MedicaoMD30RepositorySQL implements MedicaoMD30Repository {
  async getMedicoesMD30PerDateRange(measurerIP: string, range: DateRange): Promise<Array<MedicaoMD30>> {
    const medicoesMD30Data = await db.manyOrNone("SELECT * FROM medicoes WHERE medidor_ip=$1 AND timestamp >= $2 AND timestamp <= $3 ORDER BY timestamp", [measurerIP, range.initialDate, range.finalDate]);

    const medicoesMD30 = medicoesMD30Data.map((value) => {
      return MedicaoMD30Adapter.create(measurerIP, value.timestamp, value.slice(1));
    })

    return medicoesMD30;
  }
}