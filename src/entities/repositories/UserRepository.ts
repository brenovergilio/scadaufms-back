import User from '@src/entities/User';

export default interface UserRepository {
  addUser(user: User): Promise<User>;
  getByUsername(username: string): Promise<User | null>;
  getByID(id: string): Promise<User | null>;
  getAll(): Promise<Array<User>>;
  deleteUser(id: string): Promise<User>;
}
