import { v4 } from 'uuid';

export enum UserType {
  ADMIN = 1,
  GUEST = 2,
}

export default class User {
  constructor(
    public username: string,
    public password: string | null,
    public type: UserType,
    public id: string = v4()
  ) {}

  isAdmin(): boolean {
    return this.type === UserType.ADMIN;
  }
}
