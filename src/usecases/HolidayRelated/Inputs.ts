import { MinLength, IsUUID, IsDate } from 'class-validator';

export class InputAddHoliday {
  @IsUUID(4, { message: 'ID do usuário inválido' })
  sourceUserID: string;

  @MinLength(2, { message: 'Insira um nome com no mínimo dois caracteres' })
  name: string;

  @IsDate({ message: 'Data inválida' })
  day: Date;

  constructor(sourceUserID: string, name: string, day: Date) {
    this.sourceUserID = sourceUserID;
    this.name = name;
    this.day = day;
  }
}

export class InputDeleteHoliday {
  @IsUUID(4, { message: 'ID do usuário inválido' })
  sourceUserID: string;

  @IsUUID(4, { message: 'ID do feriado inválido' })
  holidayID: string;

  constructor(sourceUserID: string, holidayID: string) {
    this.sourceUserID = sourceUserID;
    this.holidayID = holidayID;
  }
}
