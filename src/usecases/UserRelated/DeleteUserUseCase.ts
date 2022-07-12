import User from "@src/entities/User";
import NotFoundError from "../util/errors/NotFoundError";
import { existsByID, validateAuthenticatedAdmin } from "../util/validators/UserValidator";
import BaseUserUseCases from "./BaseUserUseCases";
import { InputDeleteUser } from "./Inputs";

export default class DeleteUserUseCase extends BaseUserUseCases {
  async execute(input: InputDeleteUser): Promise<User> {
    await validateAuthenticatedAdmin(input.sourceUserID, this.userRepository);

    const userExists: boolean = await existsByID(
      input.targetUserID,
      this.userRepository
    );

    if (!userExists) throw new NotFoundError();

    return this.userRepository.deleteUser(input.targetUserID);
  }
}