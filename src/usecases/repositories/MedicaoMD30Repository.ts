import MedicaoMD30 from '@src/entities/MedicaoMD30';
import DateRange from '../util/DateRange';

export default interface MedicaoMD30Repository {
  getTensoesPerDateRange(measurerID: number): Promise<Array<MedicaoMD30>>;
  getCorrentesPerDateRange(measurerID: number): Promise<Array<MedicaoMD30>>;
  getPotenciasAtivasPerDateRange(
    measurerID: number
  ): Promise<Array<MedicaoMD30>>;
  getPotenciasReativasPerDateRange(
    measurerID: number
  ): Promise<Array<MedicaoMD30>>;
  getPotenciasAparentesPerDateRange(
    measurerID: number
  ): Promise<Array<MedicaoMD30>>;
  getFatoresDePotenciaPerDateRange(
    measurerID: number
  ): Promise<Array<MedicaoMD30>>;
}
