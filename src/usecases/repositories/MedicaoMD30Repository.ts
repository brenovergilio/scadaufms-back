import MedicaoMD30 from "@src/entities/MedicaoMD30";
import DateRange from "../util/DateRange";

export default interface MedicaoMD30Repository {
  getMedicoesMD30PerDateRange(measurerIp: string, range: DateRange): Array<MedicaoMD30>;
}