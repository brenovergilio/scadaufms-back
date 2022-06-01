import Taxes from '@src/entities/Taxes';
import NotFoundError from '../util/errors/NotFoundError';
import BaseTaxesUseCases from './BaseTaxesUseCases';
import { GetSpecificTaxInput } from './Inputs';

export default class GetSpecificTaxUseCase extends BaseTaxesUseCases {
  async execute(input: GetSpecificTaxInput): Promise<Taxes> {
    const taxes = await this.taxesRepository.getSpecificTax(input.type);

    if (!taxes) throw new NotFoundError();

    return taxes;
  }
}
