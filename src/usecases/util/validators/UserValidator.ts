import UserRepository from '@src/entities/repositories/UserRepository';
import InsufficentPermissionError from '../errors/InsufficientPermissionError';

export async function existsByUsername(
  username: string,
  userRepository: UserRepository
): Promise<boolean> {
  const user = await userRepository.getByUsername(username);
  return user ? true : false;
}

export async function validateAuthenticatedAdmin(
  id: string,
  userRepository: UserRepository
): Promise<void> {
  const sourceUser = await userRepository.getByID(id);

  if (!sourceUser || !sourceUser.isAdmin())
    throw new InsufficentPermissionError();
}
