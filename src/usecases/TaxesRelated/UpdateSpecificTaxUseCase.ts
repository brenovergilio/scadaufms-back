import Taxes, { TaxType } from '@src/entities/Taxes';
import InvalidValueError from '../util/errors/InvalidValueError';
import NotFoundError from '../util/errors/NotFoundError';
import { validateAuthenticatedAdmin } from '../util/validators/UserValidator';
import BaseTaxesUseCases from './BaseTaxesUseCases';
import { UpdateSpecificTaxInput } from './Inputs';

export default class UpdateSpecificTaxUseCase extends BaseTaxesUseCases {
  async execute(input: UpdateSpecificTaxInput): Promise<Taxes> {
    await validateAuthenticatedAdmin(input.sourceUserID, this.userRepository);

    const taxes = await this.taxesRepository.getSpecificTax(input.type);

    for (const inp of Object.entries(input)) {
      if (
        inp[1] !== undefined &&
        !['type', 'sourceUserID'].includes(inp[0]) &&
        (Number.isNaN(Number(inp[1])) || inp[1] === null)
      ) {
        throw new InvalidValueError();
      }
    }

    if (!taxes) throw new NotFoundError();

    if (input.demandaPonta !== undefined && input.type === TaxType.AZUL)
      taxes.demandaPonta = input.demandaPonta;
    if (input.demandaForaPonta !== undefined && input.type === TaxType.AZUL)
      taxes.demandaForaPonta = input.demandaForaPonta;
    if (input.demandaUnica !== undefined && input.type === TaxType.VERDE)
      taxes.demandaUnica = input.demandaUnica;
    if (input.consumoPonta !== undefined)
      taxes.consumoPonta = input.consumoPonta;
    if (input.consumoForaPonta !== undefined)
      taxes.consumoForaPonta = input.consumoForaPonta;

    return this.taxesRepository.updateTaxes(taxes);
  }
}
