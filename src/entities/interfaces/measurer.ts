import Measurement from "./measurement";

export default interface Measurer {
  ip: string,
  name: string,
  port: number,
  measurements: Array<Measurement>,
  addMeasurement(measurement: Measurement): void,
  getMeasurements(): Array<Measurement>,
}