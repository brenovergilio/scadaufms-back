import { v4 } from 'uuid';
import Holiday from './Holiday';
import Measurement from './interfaces/Measurement';
import MedicaoMD30 from './MedicaoMD30';
import MedidorMD30 from './MedidorMD30';
import Taxes, { TaxType } from './Taxes';
import { measurementAcumulator } from './util/helpers';

export default class Bill {
  // private consumosAtivosPonta: Array<MedicaoMD30>;
  // private consumosAtivosForaPonta: Array<MedicaoMD30>;
  // private demandasAtivasPonta: Array<MedicaoMD30>;
  // private demandasAtivasForaPonta: Array<MedicaoMD30>;

  // consumoAtivoPontaMedido: number;
  // consumoAtivoForaPontaMedido: number;
  // demandaAtivaPontaMedida: number;
  // demandaAtivaForaPontaMedida: number;

  constructor(
    public holidays: Array<Holiday>,
    public consumosAtivos: Array<MedicaoMD30>,
    public consumosReativos: Array<MedicaoMD30>,
    public demandasAtivas: Array<MedicaoMD30>,
    public demandasReativas: Array<MedicaoMD30>,
    public medidor: MedidorMD30,
    public taxes: Taxes,
    public id: string = v4()
  ) {
    //   [this.consumosAtivosPonta, this.consumosAtivosForaPonta] =
    //     this.splitPontaAndForaPonta(consumosAtivos);
    //   [this.demandasAtivasPonta, this.demandasAtivasForaPonta] =
    //     this.splitPontaAndForaPonta(demandasAtivas);
    //   this.consumoAtivoPontaMedido = this.calculateConsumoAtivoPonta();
    //   this.consumoAtivoForaPontaMedido = this.calculateConsumoAtivoForaPonta();
    //   this.demandaAtivaPontaMedida = this.calculateDemandaAtivaPonta();
    //   this.demandaAtivaForaPontaMedida = this.calculateDemandaAtivaForaPonta();
    // }

    // simulate(): number {
    //   const consumoAtivoPrice =
    //     this.consumoAtivoPontaMedido * this.taxes.consumoPonta +
    //     this.consumoAtivoForaPontaMedido * this.taxes.consumoForaPonta;
    //   const demandaAtivaPrice =
    //     this.taxes.type === TaxType.AZUL
    //       ? this.demandaAtivaPontaMedida * this.taxes.demandaPonta +
    //         this.demandaAtivaForaPontaMedida * this.taxes.demandaForaPonta
    //       : (this.demandaAtivaPontaMedida + this.demandaAtivaForaPontaMedida) *
    //         this.taxes.demandaUnica;
    //   return consumoAtivoPrice + demandaAtivaPrice;
  }
}
