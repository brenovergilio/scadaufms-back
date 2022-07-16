import UserRepository from '@src/entities/repositories/UserRepository';
import User from '@src/entities/User';
import db from '@src/external/database/postgres/database';

export default class UserRepositorySQL implements UserRepository {
  async addUser(user: User): Promise<User> {
    const userData = await db.one(
      'INSERT INTO users (id, created_at, username, password, type) VALUES ($1, NOW(), $2, $3, $4) RETURNING *',
      [user.id, user.username, user.password, user.type]
    );

    const newUser: User = new User(
      userData.username,
      null,
      userData.type,
      user.id
    );
    return newUser;
  }
  async getByUsername(username: string): Promise<User | null> {
    const userData = await db.oneOrNone(
      'SELECT * FROM users WHERE username=$1',
      [username]
    );
    if (userData) {
      const user: User = new User(
        userData.username,
        userData.password,
        userData.type,
        userData.id
      );
      return user;
    }
    return null;
  }
  async getByID(id: string): Promise<User | null> {
    const userData = await db.oneOrNone('SELECT * FROM users WHERE id=$1', [
      id,
    ]);
    if (userData) {
      const user: User = new User(
        userData.username,
        null,
        userData.type,
        userData.id
      );
      return user;
    }
    return null;
  }

  async deleteUser(id: string): Promise<User> {
    const userData = await db.one('DELETE FROM users WHERE id=$1 RETURNING *', [
      id,
    ]);
    const user: User = new User(
      userData.username,
      null,
      userData.type,
      userData.id
    );
    return user;
  }

  async getAll(): Promise<Array<User>> {
    const usersData = await db.manyOrNone('SELECT * FROM users');

    const users = usersData.map((user) => {
      return new User(user.username, null, user.type, user.id);
    });

    return users;
  }
}
