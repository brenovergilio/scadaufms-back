import Measurement from "./measurement";
import PeakHour from "./peak-hour";

export default interface Measurer {
  ip: string,
  name: string,
  port: number,
  peakHour: PeakHour
  measurements: Array<Measurement>,
}