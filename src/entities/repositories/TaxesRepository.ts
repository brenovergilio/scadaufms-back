import Taxes, { TaxType } from '../Taxes';

export default interface TaxesRepository {
  getAllTaxes(): Promise<Array<Taxes>>;
  getSpecificTax(type: TaxType): Promise<Taxes | null>;
  updateTaxes(taxes: Taxes): Promise<Taxes>;
}
