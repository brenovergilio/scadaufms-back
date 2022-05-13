export default interface MeasurerChecker {
  isOpen(ip: string, port: number): Promise<boolean>;
}
