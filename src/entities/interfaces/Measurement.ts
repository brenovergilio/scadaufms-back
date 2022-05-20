export default interface Measurement {
  measurerID: string;
  timestamp: Date | string;
  values: Map<string, number>;
}
