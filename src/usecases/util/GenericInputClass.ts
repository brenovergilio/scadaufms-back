import { InputDeleteAlarm } from '../AlarmRelated/Inputs';
import { InputAddHoliday, InputDeleteHoliday } from '../HolidayRelated/Inputs';
import {
  InputAddMedidorMD30,
  InputDeleteMedidorMD30,
} from '../MedidorMD30Related/Inputs';
import { InputCreateUser } from '../UserRelated/Inputs';

export type GenericInputClass =
  | InputAddMedidorMD30
  | InputDeleteMedidorMD30
  | InputCreateUser
  | InputAddHoliday
  | InputDeleteHoliday
  | InputDeleteAlarm;
