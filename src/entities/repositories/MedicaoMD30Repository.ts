import MedicaoMD30 from '@src/entities/MedicaoMD30';
import DateRange from '../../usecases/util/DateRange';

export default interface MedicaoMD30Repository {
  getTensoesPerDateRange(
    measurerID: string,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>>;
  getCorrentesPerDateRange(
    measurerID: string,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>>;
  getPotenciasAtivasPerDateRange(
    measurerID: string,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>>;
  getPotenciasReativasPerDateRange(
    measurerID: string,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>>;
  getPotenciasAparentesPerDateRange(
    measurerID: string,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>>;
  getFatoresDePotenciaPerDateRange(
    measurerID: string,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>>;
}
