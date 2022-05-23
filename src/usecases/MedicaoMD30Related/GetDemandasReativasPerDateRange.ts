import MedicaoMD30 from '@src/entities/MedicaoMD30';
import DateRange from '../util/DateRange';
import BaseMedicaoMD30UseCases from './BaseMedicaoMD30UseCases';

export default class GetDemandasReativasPerDateRange extends BaseMedicaoMD30UseCases {
  async execute(id: string, dateRange: DateRange): Promise<Array<MedicaoMD30>> {
    const demandasReativas: Array<MedicaoMD30> =
      await this.medicaoMD30Repository.getDemandasReativasPerDateRange(
        id,
        dateRange
      );
    return demandasReativas;
  }
}
