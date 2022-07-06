import { TaxType } from '@src/entities/Taxes';
import DateRange from '@src/usecases/util/DateRange';
import { IsEnum, IsNumber, IsUUID, Min } from 'class-validator';

export class SimulateBillInput {
  @IsNumber(undefined, { message: 'O valor deve ser um número' })
  @Min(0, { message: 'O valor deve ser maior ou igual a 0' })
  demandaContratada: number;

  @IsEnum(TaxType, { message: 'Tipo de imposto inválido' })
  type: TaxType;

  @IsUUID(4, { message: 'ID do medidor inválido' })
  medidorID: string;

  dateRange: DateRange;

  constructor(
    demandaContratada: number,
    type: TaxType,
    dateRange: DateRange,
    medidorID: string
  ) {
    this.demandaContratada = demandaContratada;
    this.type = type;
    this.dateRange = dateRange;
    this.medidorID = medidorID;
  }
}
