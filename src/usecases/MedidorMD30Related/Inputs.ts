import MeasurerChecker from '@src/entities/interfaces/MeasurerChecker';
import Rush from '@src/entities/interfaces/Rush';
import {
  IsInt,
  IsIP,
  Min,
  Max,
  MinLength,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class InputAddMedidorMD30 {
  @IsUUID(4, { message: 'ID do usuário inválido' })
  sourceUserID: string;

  @IsIP(4, { message: 'IPv4 inválido' })
  ip: string;

  @MinLength(2, { message: 'Insira um nome com no mínimo dois caracteres' })
  name: string;

  @IsInt({ message: 'O número de porta deve ser um inteiro' })
  @Min(0, { message: 'O valor mínimo para uma porta é 0' })
  @Max(65535, { message: 'O valor máximo para uma porta é 65535' })
  port: number;

  rush: Rush;
  measurerChecker: MeasurerChecker;

  constructor(
    sourceUserID: string,
    ip: string,
    name: string,
    port: number,
    measurerChecker: MeasurerChecker,
    rush: Rush = { hour: 17, minute: 30, interval: 3 }
  ) {
    this.sourceUserID = sourceUserID;
    this.ip = ip.trim();
    this.name = name.trim();
    this.port = port;
    this.rush = rush;
    this.measurerChecker = measurerChecker;
  }
}

export class InputDeleteMedidorMD30 {
  @IsUUID(4, { message: 'ID do usuário inválido' })
  sourceUserID: string;

  @IsUUID(4, { message: 'ID do Medidor MD30 inválido' })
  medidorID: string;

  constructor(sourceUserID: string, medidorID: string) {
    this.sourceUserID = sourceUserID;
    this.medidorID = medidorID;
  }
}

export class InputUpdateSpecificMedidorMD30 {
  @IsUUID(4, { message: 'ID do usuário inválido' })
  sourceUserID: string;

  @IsUUID(4, { message: 'ID do Medidor MD30 inválido' })
  medidorID: string;

  @IsOptional()
  @IsIP(4, { message: 'IPv4 inválido' })
  ip?: string;

  measurerChecker: MeasurerChecker;

  @IsOptional()
  @MinLength(2, { message: 'Insira um nome com no mínimo dois caracteres' })
  name?: string;

  @IsOptional()
  @IsInt({ message: 'O número de porta deve ser um inteiro' })
  @Min(0, { message: 'O valor mínimo para uma porta é 0' })
  @Max(65535, { message: 'O valor máximo para uma porta é 65535' })
  port?: number;

  @IsOptional()
  rushHour?: number;

  @IsOptional()
  rushMinute?: number;

  @IsOptional()
  rushInterval?: number;

  constructor(
    sourceUserID: string,
    medidorID: string,
    measurerChecker: MeasurerChecker,
    ip?: string,
    name?: string,
    port?: number,
    rushHour?: number,
    rushMinute?: number,
    rushInterval?: number
  ) {
    this.sourceUserID = sourceUserID;
    this.medidorID = medidorID;
    this.measurerChecker = measurerChecker;
    this.ip = ip ? ip.trim() : undefined;
    this.name = name ? name.trim() : undefined;
    this.port = port;
    this.rushHour = rushHour;
    this.rushMinute = rushMinute;
    this.rushInterval = rushInterval;
  }
}
