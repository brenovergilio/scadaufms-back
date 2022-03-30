import Measurement from "@src/entities/interfaces/measurement";
import medicaoMd30 from "@src/entities/medicao-md30";
import MedicaoMD30Repository from "@src/usecases/repositories/MedicaoMD30Repository";
import DateRange from "@src/usecases/util/date-range";

export default class MedicaoMD30RepositoryMemory implements MedicaoMD30Repository {
  getMedicoesMD30PerDateRange(measurerIp: string, range: DateRange): Promise<medicaoMd30[]> {
    throw new Error("Method not implemented.");
  }

  measurements = [

  ]

  getMeasurementsPerDateRange(measurerIp: string, range: DateRange): Promise<Array<Measurement>> {
    return Promise.resolve(this.measurements.filter())
  }
}