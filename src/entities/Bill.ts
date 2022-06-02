import { v4 } from "uuid";
import Holiday from "./Holiday";
import Measurement from "./interfaces/Measurement";
import Rush from "./interfaces/Rush";
import MedicaoMD30 from "./MedicaoMD30";
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
    public rush: Rush,
    public taxes: Taxes,
    public id: string = v4()
  ) {
    [this.consumosAtivosPonta, this.consumosAtivosForaPonta] = this.splitPontaAndForaPonta(consumosAtivos);
    [this.demandasAtivasPonta, this.demandasAtivasForaPonta] = this.splitPontaAndForaPonta(demandasAtivas);
  }

  calculate(): number {
    return this.taxes.type === TaxType.VERDE ? this.calculateGreen() : this.calculateBlue(); 
  }

  private calculateGreen(): number {
    return 0;
  }

  private calculateBlue(): number {
    return 0;
  }

  // private calculateConsumoAtivo(): number {
  //   const consumoPontaMedido = this.consumosAtivosPonta.reduce((acc, current) => acc + measurementAcumulator(current), 0);
  //   const consumoForaPontaMedido = this.consumosAtivosForaPonta.reduce((acc, current) => acc + measurementAcumulator(current), 0);


  // }

  private splitPontaAndForaPonta(measurements: Array<Measurement>): [Array<Measurement>, Array<Measurement>] {
    const insidePonta = new Array<Measurement>();
    const outsidePonta = new Array<Measurement>();
    for(const measurement of measurements) {
      if(isInsideRushHour(measurement, this.rush, this.holidays)) insidePonta.push(measurement);
      else outsidePonta.push(measurement);
    }
    return [insidePonta, outsidePonta];
  }
}