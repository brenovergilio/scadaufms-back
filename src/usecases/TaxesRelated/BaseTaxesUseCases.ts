import TaxesRepository from '@src/entities/repositories/TaxesRepository';
import UserRepository from '@src/entities/repositories/UserRepository';

export default class BaseTaxesUseCases {
  taxesRepository: TaxesRepository;
  userRepository: UserRepository;

  constructor(
    taxesRepository: TaxesRepository,
    userRepository: UserRepository
  ) {
    this.taxesRepository = taxesRepository;
    this.userRepository = userRepository;
  }
}
