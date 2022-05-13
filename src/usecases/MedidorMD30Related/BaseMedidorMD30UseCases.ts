import UserRepository from '@src/entities/repositories/UserRepository';
import MedidorMD30Repository from '../../entities/repositories/MedidorMD30Repository';

export default class BaseMedidorMD30UseCases {
  medidorMD30Repository: MedidorMD30Repository;
  userRepository: UserRepository;

  constructor(
    medidorMD30Repository: MedidorMD30Repository,
    userRepository: UserRepository
  ) {
    this.medidorMD30Repository = medidorMD30Repository;
    this.userRepository = userRepository;
  }
}
