export default interface Measurement{
  measurerID: number;
  timestamp: Date;
  values: Map<string, number>;
}