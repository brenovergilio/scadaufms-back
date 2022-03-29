import Measurement from "@src/entities/interfaces/measurement";
import DateRange from "../util/date-range";

export default interface MeasurementRepository {
  getMeasurementsPerInterval(measurerIp: string, range: DateRange): Array<Measurement>;
}