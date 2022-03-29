import Measurement from "./measurement";

export default interface Measurer {
  ip: string,
  name: string,
  peak_hour: number,
  peak_minute: number,
  peak_interval: number,
  measurements: Array<Measurement>
}