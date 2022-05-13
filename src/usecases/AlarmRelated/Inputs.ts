import { IsUUID } from 'class-validator';

export class InputDeleteAlarm {
  @IsUUID(4, { message: 'ID do usuário inválido' })
  sourceUserID: string;

  @IsUUID(4, { message: 'ID do alarme inválido' })
  alarmID: string;

  constructor(sourceUserID: string, alarmID: string) {
    this.sourceUserID = sourceUserID;
    this.alarmID = alarmID;
  }
}
