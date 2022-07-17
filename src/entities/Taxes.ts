import { v4 } from 'uuid';

export enum TaxType {
  AZUL = 1,
  VERDE = 2,
}

export default class Taxes {
  constructor(
    public type: TaxType,
    public demandaPonta: number,
    public demandaForaPonta: number,
    public demandaUnica: number,
    public consumoPonta: number,
    public consumoForaPonta: number,
    public id: string = v4()
  ) {}
}
