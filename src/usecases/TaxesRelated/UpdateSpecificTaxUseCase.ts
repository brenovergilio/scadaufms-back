import Taxes, { TaxType } from '@src/entities/Taxes';
import NotFoundError from '../util/errors/NotFoundError';
import { validateAuthenticatedAdmin } from '../util/validators/UserValidator';
import BaseTaxesUseCases from './BaseTaxesUseCases';
import { UpdateSpecificTaxInput } from './Inputs';

export default class UpdateSpecificTaxUseCase extends BaseTaxesUseCases {
  async execute(input: UpdateSpecificTaxInput): Promise<Taxes> {
    await validateAuthenticatedAdmin(input.sourceUserID, this.userRepository);
    const taxes = await this.taxesRepository.getSpecificTax(input.type);

    if (!taxes) throw new NotFoundError();

    if (input.demandaPonta !== undefined && input.type === TaxType.AZUL)
      taxes.demandaPonta = input.demandaPonta;
    if (input.demandaForaPonta !== undefined && input.type === TaxType.AZUL)
      taxes.demandaForaPonta = input.demandaForaPonta;
    if (input.demandaUnica !== undefined && input.type === TaxType.VERDE)
      taxes.demandaUnica = input.demandaUnica;
    if (input.consumoPonta !== undefined) taxes.consumoPonta = input.consumoPonta;
    if (input.consumoForaPonta !== undefined) taxes.consumoForaPonta = input.consumoForaPonta;

    const updatedTaxes = await this.taxesRepository.updateTaxes(taxes);
    return updatedTaxes;
  }
}
