import User from "@src/entities/User";
import BaseUserUseCases from "./BaseUserUseCases";

export default class GetAllUsersUseCase extends BaseUserUseCases {
  async execute(): Promise<Array<User>> {
    return await this.userRepository.getAll();
  }
}