import { IsUUID, MaxLength, MinLength } from 'class-validator';

export class InputCreateUser {
  @IsUUID(4, { message: 'ID do usuário fonte inválido;' })
  sourceUserID: string;

  @MinLength(3, {
    message: 'O nome de usuário deve ter no mínimo 3 caracteres',
  })
  @MaxLength(20, {
    message: 'O nome de usuário deve ter no máximo 20 caracteres',
  })
  username: string;

  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @MaxLength(20, { message: 'A senha deve ter no máximo 20 caracteres' })
  password: string;

  constructor(sourceUserID: string, username: string, password: string) {
    this.sourceUserID = sourceUserID;
    this.username = username;
    this.password = password;
  }
}
