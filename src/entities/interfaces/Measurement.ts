export default interface Measurement {
  measurerID: string;
  timestamp: Date;
  values: Map<string, number>;
}
