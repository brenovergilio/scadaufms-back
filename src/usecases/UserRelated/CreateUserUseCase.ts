import User, { UserType } from '@src/entities/User';
import AlreadyExistsError from '../util/errors/AlreadyExistsError';
import {
  existsByUsername,
  validateAuthenticatedAdmin,
} from '../util/validators/UserValidator';
import BaseUserUseCases from './BaseUserUseCases';
import { InputCreateUser } from './Inputs';

export default class CreateUserUseCase extends BaseUserUseCases {
  async execute(input: InputCreateUser): Promise<User> {
    await validateAuthenticatedAdmin(input.sourceUserID, this.userRepository);

    if (await existsByUsername(input.username, this.userRepository))
      throw new AlreadyExistsError();
    const newUser = new User(input.username, input.password, UserType.ADMIN);
    return await this.userRepository.addUser(newUser);
  }
}
