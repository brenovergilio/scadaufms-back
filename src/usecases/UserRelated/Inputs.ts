import User, { UserType } from '@src/entities/User';
import { IsEnum, IsUUID, MaxLength, MinLength } from 'class-validator';

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

  @IsEnum(UserType, { message: 'Tipo de usuário inválido' })
  type: UserType;

  constructor(
    sourceUserID: string,
    username: string,
    password: string,
    type: UserType
  ) {
    this.sourceUserID = sourceUserID;
    this.username = username;
    this.password = password;
    this.type = type;
  }
}

export class InputDeleteUser {
  @IsUUID(4, { message: 'ID do usuário fonte inválido' })
  sourceUserID: string;

  @IsUUID(4, { message: 'ID do usuário alvo inválido' })
  targetUserID: string;

  constructor(sourceUserID: string, targetUserID: string) {
    this.sourceUserID = sourceUserID;
    this.targetUserID = targetUserID;
  }
}
