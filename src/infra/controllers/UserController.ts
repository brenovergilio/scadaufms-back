import UserRepository from '@src/entities/repositories/UserRepository';
import User from '@src/entities/User';
import CreateUserUseCase from '@src/usecases/UserRelated/CreateUserUseCase';
import { InputCreateUser } from '@src/usecases/UserRelated/Inputs';
import LoginUseCase from '@src/usecases/UserRelated/LoginUseCase';
import InvalidPasswordError from '../errors/InvalidPasswordError';
import InvalidUsernameError from '../errors/InvalidUsernameError';
import BaseController, { ResponseJWT } from './BaseController';

export default class UserController extends BaseController {
  static async createUser(
    params: any,
    body: any,
    query: any,
    headers: any,
    userRepository: UserRepository
  ): Promise<User> {
    const { username, password } = body;
    const token = headers.authorization.split(' ')[1];
    const sourceUserID = BaseController.decodeIDFromToken(token);
    const input: InputCreateUser = new InputCreateUser(
      sourceUserID,
      username,
      password
    );

    await BaseController.validateInput(input);

    const hashedPassword = await BaseController.hashPassword(password);
    input.password = hashedPassword;

    return new CreateUserUseCase(userRepository).execute(input);
  }

  static async login(
    params: any,
    body: any,
    query: any,
    headers: any,
    userRepository: UserRepository
  ): Promise<ResponseJWT> {
    const { username, password } = body;

    if (!username) throw new InvalidUsernameError();

    const user = await new LoginUseCase(userRepository).execute(username);

    const passwordMatches = await BaseController.compareHashedPassword(
      password,
      user.password
    );

    if (!passwordMatches) throw new InvalidPasswordError();

    return { jwt: BaseController.generateJWT(user.id) };
  }
}
