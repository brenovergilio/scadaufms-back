import User from '@src/entities/User';
import NotFoundError from '../util/errors/NotFoundError';
import BaseUserUseCases from './BaseUserUseCases';

export default class LoginUseCase extends BaseUserUseCases {
  async execute(username: string): Promise<User> {
    const user = await this.userRepository.getByUsername(username);
    if (!user) throw new NotFoundError();
    return user;
  }
}
