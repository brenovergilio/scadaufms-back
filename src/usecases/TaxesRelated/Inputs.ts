import { TaxType } from '@src/entities/Taxes';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

export class GetSpecificTaxInput {
  @IsEnum(TaxType, { message: 'Tipo de imposto inválido' })
  type: TaxType;

  constructor(type: TaxType) {
    this.type = type;
  }
}

export class UpdateSpecificTaxInput {
  @IsEnum(TaxType, { message: 'Tipo de imposto inválido' })
  type: TaxType;

  @IsOptional()
  @IsNumber(undefined, { message: 'O valor deve ser um número' })
  @Min(0, { message: 'O valor deve ser maior ou igual a 0' })
  demandaPonta: number;

  @IsOptional()
  @IsNumber(undefined, { message: 'O valor deve ser um número' })
  @Min(0, { message: 'O valor deve ser maior ou igual a 0' })
  demandaForaPonta: number;

  @IsOptional()
  @IsNumber(undefined, { message: 'O valor deve ser um número' })
  @Min(0, { message: 'O valor deve ser maior ou igual a 0' })
  demandaUnica: number;

  @IsOptional()
  @IsNumber(undefined, { message: 'O valor deve ser um número' })
  @Min(0, { message: 'O valor deve ser maior ou igual a 0' })
  consumoPonta: number;

  @IsOptional()
  @IsNumber(undefined, { message: 'O valor deve ser um número' })
  @Min(0, { message: 'O valor deve ser maior ou igual a 0' })
  consumoForaPonta: number;

  constructor(
    type: TaxType,
    demandaPonta: number,
    demandaForaPonta: number,
    demandaUnica: number,
    consumoPonta: number,
    consumoForaPonta: number
  ) {
    this.type = type;
    this.demandaPonta = demandaPonta;
    this.demandaForaPonta = demandaForaPonta;
    this.demandaUnica = demandaUnica;
    this.consumoPonta = consumoPonta;
    this.consumoForaPonta = consumoForaPonta;
  }
}