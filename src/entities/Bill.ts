import { v4 } from "uuid";
import Holiday from "./Holiday";
import Measurement from "./interfaces/Measurement";
import MedicaoMD30 from "./MedicaoMD30";
import MedidorMD30 from "./MedidorMD30";
import Taxes, { TaxType } from "./Taxes";
import { isInsideRushHour, measurementAcumulator } from "./util/helpers";

export default class Bill {

  private consumosAtivosPonta: Array<MedicaoMD30>;
  private consumosAtivosForaPonta: Array<MedicaoMD30>;
  private demandasAtivasPonta: Array<MedicaoMD30>;
  private demandasAtivasForaPonta: Array<MedicaoMD30>;

  constructor(
    public month: number,
    public year: number,
    public demandaContratada: number,
    public holidays: Array<Holiday>,
    public consumosAtivos: Array<MedicaoMD30>,
    public consumosReativos: Array<MedicaoMD30>,
    public demandasAtivas: Array<MedicaoMD30>,
    public demandasReativas: Array<MedicaoMD30>,
    public medidor: MedidorMD30,
    public taxes: Taxes,
    public id: string = v4()
  ) {
    [this.consumosAtivosPonta, this.consumosAtivosForaPonta] = this.splitPontaAndForaPonta(consumosAtivos);
    [this.demandasAtivasPonta, this.demandasAtivasForaPonta] = this.splitPontaAndForaPonta(demandasAtivas);
  }

  simulate(): number {
    const consumoAtivoPontaMedido = this.calculateConsumoAtivoPonta();
    const consumoAtivoForaPontaMedido = this.calculateConsumoAtivoForaPonta();
    const demandaAtivaPontaMedida = this.calculateDemandaAtivaPonta();
    const demandaAtivaForaPontaMedida = this.calculateDemandaAtivaForaPonta();

    const consumoAtivoFinalPrice = (consumoAtivoPontaMedido * this.taxes.consumoPonta) + (consumoAtivoForaPontaMedido * this.taxes.consumoForaPonta);
    const demandaAtivaFinalPrice = this.taxes.type === TaxType.AZUL ? (demandaAtivaPontaMedida * this.taxes.demandaPonta) + (demandaAtivaForaPontaMedida * this.taxes.demandaForaPonta) : (demandaAtivaPontaMedida + demandaAtivaForaPontaMedida) * this.taxes.demandaUnica;

    return consumoAtivoFinalPrice + demandaAtivaFinalPrice;
  }

  private calculateConsumoAtivoPonta(): number {
    return this.consumosAtivosPonta.reduce((acc, current) => acc + measurementAcumulator(current), 0);
  }

  private calculateConsumoAtivoForaPonta(): number {
    return this.consumosAtivosForaPonta.reduce((acc, current) => acc + measurementAcumulator(current), 0);
  }

  private calculateDemandaAtivaPonta(): number {
   return this.demandasAtivasPonta.reduce((acc, current) => acc + measurementAcumulator(current), 0);
  }

  private calculateDemandaAtivaForaPonta(): number {
    return this.demandasAtivasForaPonta.reduce((acc, current) => acc + measurementAcumulator(current), 0);
  }

  // private calculateDemandaReativaExcedente(): number {
    
  // }

  private splitPontaAndForaPonta(measurements: Array<Measurement>): [Array<Measurement>, Array<Measurement>] {
    const insidePonta = new Array<Measurement>();
    const outsidePonta = new Array<Measurement>();
    for(const measurement of measurements) {
      if(isInsideRushHour(measurement, this.medidor.rush, this.holidays)) insidePonta.push(measurement);
      else outsidePonta.push(measurement);
    }
    return [insidePonta, outsidePonta];
  }
}