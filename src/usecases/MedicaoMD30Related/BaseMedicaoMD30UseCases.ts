import MedicaoMD30Repository from '../../entities/repositories/MedicaoMD30Repository';

export default class BaseMedicaoMD30UseCases {
  medicaoMD30Repository: MedicaoMD30Repository;

  constructor(medicaoMD30Repository: MedicaoMD30Repository) {
    this.medicaoMD30Repository = medicaoMD30Repository;
  }
}
