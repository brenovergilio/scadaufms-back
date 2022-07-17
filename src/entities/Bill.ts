import Taxes, { TaxType } from './Taxes';

export default class Bill {
  constructor() {}

  static simulate(
    taxes: Taxes,
    consumoPontaTotal: number,
    consumoForaPontaTotal: number,
    demandaPontaTotal: number,
    demandaForaPontaTotal: number
  ): number {
    const consumoAtivoPrice =
      consumoPontaTotal * taxes.consumoPonta +
      consumoForaPontaTotal * taxes.consumoForaPonta;
    const demandaAtivaPrice =
      taxes.type === TaxType.AZUL
        ? demandaPontaTotal * taxes.demandaPonta +
          demandaForaPontaTotal * taxes.demandaForaPonta
        : demandaForaPontaTotal * taxes.demandaUnica;
    return consumoAtivoPrice + demandaAtivaPrice;
  }
}
