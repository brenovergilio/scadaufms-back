import { InputDeleteAlarm } from '../AlarmRelated/Inputs';
import { SimulateBillInput } from '../BillRelated/Inputs';
import { InputAddHoliday, InputDeleteHoliday } from '../HolidayRelated/Inputs';
import {
  InputAddMedidorMD30,
  InputDeleteMedidorMD30,
} from '../MedidorMD30Related/Inputs';
import UpdateSpecificMedidorMD30 from '../MedidorMD30Related/UpdateSpecificMedidorMD30';
import {
  GetSpecificTaxInput,
  UpdateSpecificTaxInput,
} from '../TaxesRelated/Inputs';
import { InputCreateUser, InputDeleteUser } from '../UserRelated/Inputs';

export type GenericInputClass =
  | InputAddMedidorMD30
  | InputDeleteMedidorMD30
  | InputCreateUser
  | InputAddHoliday
  | InputDeleteHoliday
  | InputDeleteAlarm
  | SimulateBillInput
  | GetSpecificTaxInput
  | UpdateSpecificTaxInput
  | UpdateSpecificMedidorMD30
  | InputDeleteUser;
