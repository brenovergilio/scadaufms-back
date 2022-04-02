export default interface Measurement{
  measurerIP: string,
  timestamp: Date,
  values: Map<string, number>,
}