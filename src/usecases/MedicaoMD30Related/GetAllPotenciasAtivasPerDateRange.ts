import MedicaoMD30 from '@src/entities/MedicaoMD30';
import DateRange from '../util/DateRange';
import BaseMedicaoMD30UseCases from './BaseMedicaoMD30UseCases';

export default class GetAllPotenciasPerDateRange extends BaseMedicaoMD30UseCases {
  async execute(id: string, dateRange: DateRange): Promise<Array<MedicaoMD30>> {
    const allPotencias: Array<MedicaoMD30> =
      await this.medicaoMD30Repository.getAllPotenciasPerDateRange(
        id,
        dateRange
      );
    return allPotencias;
  }
}
