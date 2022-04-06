import MedicaoMD30 from "@src/entities/MedicaoMD30";
import DateRange from "../util/DateRange";

export default interface MedicaoMD30Repository {
  getTensoesPerDateRange(measurerIP: string): Promise<Array<MedicaoMD30>>;
  getCorrentesPerDateRange(measurerIP: string): Promise<Array<MedicaoMD30>>;
  getPotenciasAtivasPerDateRange(measurerIP: string): Promise<Array<MedicaoMD30>>;
  getPotenciasReativasPerDateRange(measurerIP: string): Promise<Array<MedicaoMD30>>;
  getPotenciasAparentesPerDateRange(measurerIP: string): Promise<Array<MedicaoMD30>>;
  getFatoresDePotenciaPerDateRange(measurerIP: string): Promise<Array<MedicaoMD30>>;
}