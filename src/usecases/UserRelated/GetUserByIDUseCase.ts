import User from '@src/entities/User';
import NotFoundError from '../util/errors/NotFoundError';
import BaseUserUseCases from './BaseUserUseCases';

export default class GetUserByIDUseCase extends BaseUserUseCases {
  async execute(id: string): Promise<User> {
    const user = await this.userRepository.getByID(id);

    if (!user) throw new NotFoundError();

    return user;
  }
}
