import UserRepository from '../../entities/repositories/UserRepository';

export default class BaseUserUseCases {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
}
