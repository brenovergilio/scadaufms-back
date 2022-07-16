import DateRange from '@src/usecases/util/DateRange';
import { IsString, IsArray, ArrayMinSize } from 'class-validator';

export class SimulateBillInput {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  medidoresID: Array<string>;

  dateRange: DateRange;

  constructor(dateRange: DateRange, medidoresID: Array<string>) {
    this.dateRange = dateRange;
    this.medidoresID = medidoresID;
  }
}
