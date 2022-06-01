import Taxes from '@src/entities/Taxes';
import BaseTaxesUseCases from './BaseTaxesUseCases';

export default class GetAllTaxesUseCase extends BaseTaxesUseCases {
  async execute(): Promise<Array<Taxes>> {
    return this.taxesRepository.getAllTaxes();
  }
}
