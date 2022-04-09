import MedicaoMD30 from '@src/entities/MedicaoMD30';
import MedicaoMD30Repository from '../repositories/MedicaoMD30Repository';

export default class GetPotenciasAtivasPerDateRange {
  medicaoMD30Repository: MedicaoMD30Repository;

  constructor(medicaoMD30Repository: MedicaoMD30Repository) {
    this.medicaoMD30Repository = medicaoMD30Repository;
  }

  async execute(id: number): Promise<Array<MedicaoMD30>> {
    const potenciasAtivas: Array<MedicaoMD30> =
      await this.medicaoMD30Repository.getPotenciasAtivasPerDateRange(id);
    return potenciasAtivas;
  }
}
