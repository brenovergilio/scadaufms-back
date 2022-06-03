import MedicaoMD30 from '@src/entities/MedicaoMD30';
import DateRange from '../util/DateRange';
import BaseMedicaoMD30UseCases from './BaseMedicaoMD30UseCases';

export default class GetConsumosAtivosPerDateRange extends BaseMedicaoMD30UseCases {
  async execute(id: string, dateRange: DateRange): Promise<Array<MedicaoMD30>> {
    const consumosAtivos: Array<MedicaoMD30> =
      await this.medicaoMD30Repository.getConsumosAtivosPerDateRange(
        id,
        900,
        dateRange
      );
    return consumosAtivos;
  }
}
