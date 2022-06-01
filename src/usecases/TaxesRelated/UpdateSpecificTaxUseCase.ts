import Taxes, { TaxType } from '@src/entities/Taxes';
import NotFoundError from '../util/errors/NotFoundError';
import BaseTaxesUseCases from './BaseTaxesUseCases';
import { UpdateSpecificTaxInput } from './Inputs';

export default class UpdateSpecificTaxUseCase extends BaseTaxesUseCases {
  async execute(input: UpdateSpecificTaxInput): Promise<Taxes> {
    const taxes = await this.taxesRepository.getSpecificTax(input.type);

    if (!taxes) throw new NotFoundError();

    if (input.demandaPonta && input.type === TaxType.AZUL)
      taxes.demandaPonta = input.demandaPonta;
    if (input.demandaForaPonta && input.type === TaxType.AZUL)
      taxes.demandaForaPonta = input.demandaForaPonta;
    if (input.demandaUnica && input.type === TaxType.VERDE)
      taxes.demandaUnica = input.demandaUnica;
    if (input.consumoPonta) taxes.consumoPonta = input.consumoPonta;
    if (input.consumoForaPonta) taxes.consumoForaPonta = input.consumoForaPonta;

    const updatedTaxes = await this.taxesRepository.updateTaxes(taxes);
    return updatedTaxes;
  }
}
