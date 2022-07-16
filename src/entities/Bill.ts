import { v4 } from 'uuid';
import Holiday from './Holiday';
import Measurement from './interfaces/Measurement';
import MedicaoMD30 from './MedicaoMD30';
import MedidorMD30 from './MedidorMD30';
import Taxes, { TaxType } from './Taxes';
import { measurementAcumulator } from './util/helpers';

export default class Bill {

  constructor() { }

  static simulate(taxes: Taxes, consumoPontaTotal: number, consumoForaPontaTotal: number, demandaPontaTotal: number, demandaForaPontaTotal: number): number {
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
