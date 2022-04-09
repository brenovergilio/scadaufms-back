export default interface MeasurerClient {
  isOpen(ip: string, port: number): boolean;
} 