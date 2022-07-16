import UserRepository from '@src/entities/repositories/UserRepository';
import User from '@src/entities/User';
import CreateUserUseCase from '@src/usecases/UserRelated/CreateUserUseCase';
import DeleteUserUseCase from '@src/usecases/UserRelated/DeleteUserUseCase';
import GetAllUsersUseCase from '@src/usecases/UserRelated/GetAllUsersUseCase';
import GetUserByIDUseCase from '@src/usecases/UserRelated/GetUserByIDUseCase';
import {
  InputCreateUser,
  InputDeleteUser,
} from '@src/usecases/UserRelated/Inputs';
import LoginUseCase from '@src/usecases/UserRelated/LoginUseCase';
import UnauthorizedError from '../errors/UnauthorizedError';
import BaseController, { ResponseJWT } from './BaseController';

export default class UserController extends BaseController {
  static async createUser(
    params: any,
    body: any,
    query: any,
    headers: any,
    userRepository: UserRepository
  ): Promise<User> {
    const { username, password, type } = body;
    const token = headers.authorization.split(' ')[1];
    const sourceUserID = BaseController.decodeIDFromToken(token);
    const input: InputCreateUser = new InputCreateUser(
      sourceUserID,
      username,
      password,
      type
    );

    await BaseController.validateInput(input);

    const hashedPassword = await BaseController.hashPassword(password);
    input.password = hashedPassword;

    return new CreateUserUseCase(userRepository).execute(input);
  }

  static async deleteUser(
    params: any,
    body: any,
    query: any,
    headers: any,
    userRepository: UserRepository
  ): Promise<User> {
    const { id } = params;
    const token = headers.authorization.split(' ')[1];
    const sourceUserID = BaseController.decodeIDFromToken(token);

    const input: InputDeleteUser = new InputDeleteUser(sourceUserID, id);

    await BaseController.validateInput(input);

    const deleteUserUseCase = new DeleteUserUseCase(userRepository).execute(
      input
    );
    return deleteUserUseCase;
  }

  static async getAll(
    params: any,
    body: any,
    query: any,
    headers: any,
    userRepository: UserRepository
  ): Promise<Array<User>> {
    const getAllUsers = new GetAllUsersUseCase(userRepository).execute();
    return getAllUsers;
  }

  static getUserByID(
    params: any,
    body: any,
    query: any,
    headers: any,
    userRepository: UserRepository
  ): Promise<User> {
    const { id } = params;
    const getUserByIDUseCase = new GetUserByIDUseCase(userRepository).execute(
      id
    );
    return getUserByIDUseCase;
  }

  static async login(
    params: any,
    body: any,
    query: any,
    headers: any,
    userRepository: UserRepository
  ): Promise<ResponseJWT> {
    const { username, password } = body;

    if (!username) throw new UnauthorizedError();

    const user = await new LoginUseCase(userRepository).execute(username);

    const passwordMatches = await BaseController.compareHashedPassword(
      password,
      user.password!
    );

    if (!passwordMatches) throw new UnauthorizedError();

    return { jwt: BaseController.generateJWT(user.id) };
  }
}
