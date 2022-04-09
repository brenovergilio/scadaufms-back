import MedicaoMD30 from '@src/entities/MedicaoMD30';
import DateRange from '../util/DateRange';

export default interface MedicaoMD30Repository {
  getTensoesPerDateRange(
    measurerID: number,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>>;
  getCorrentesPerDateRange(
    measurerID: number,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>>;
  getPotenciasAtivasPerDateRange(
    measurerID: number,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>>;
  getPotenciasReativasPerDateRange(
    measurerID: number,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>>;
  getPotenciasAparentesPerDateRange(
    measurerID: number,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>>;
  getFatoresDePotenciaPerDateRange(
    measurerID: number,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>>;
}
