import TaxesRepository from '@src/entities/repositories/TaxesRepository';

export default class BaseTaxesUseCases {
  taxesRepository: TaxesRepository;

  constructor(taxesRepository: TaxesRepository) {
    this.taxesRepository = taxesRepository;
  }
}
