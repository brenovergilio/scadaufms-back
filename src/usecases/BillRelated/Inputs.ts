import { TaxType } from '@src/entities/Taxes';
import DateRange from '@src/usecases/util/DateRange';
import { IsString, IsEnum, IsArray, ArrayMinSize } from 'class-validator';

export class SimulateBillInput {
  @IsEnum(TaxType, { message: 'Tipo de imposto inválido' })
  type: TaxType;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  medidoresID: Array<string>;

  dateRange: DateRange;

  constructor(type: TaxType, dateRange: DateRange, medidoresID: Array<string>) {
    this.type = type;
    this.dateRange = dateRange;
    this.medidoresID = medidoresID;
  }
}
