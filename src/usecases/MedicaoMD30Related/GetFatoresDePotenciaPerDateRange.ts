import MedicaoMD30 from '@src/entities/MedicaoMD30';
import DateRange from '../util/DateRange';
import BaseMedicaoMD30UseCases from './BaseMedicaoMD30UseCases';

export default class GetFatoresDePotenciaPerDateRange extends BaseMedicaoMD30UseCases {
  async execute(id: string, dateRange: DateRange): Promise<Array<MedicaoMD30>> {
    const fatoresDePotencia: Array<MedicaoMD30> =
      await this.medicaoMD30Repository.getFatoresDePotenciaPerDateRange(
        id,
        dateRange
      );
    return fatoresDePotencia;
  }
}
