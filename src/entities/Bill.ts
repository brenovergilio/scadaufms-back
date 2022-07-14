import { v4 } from 'uuid';
import Holiday from './Holiday';
import Measurement from './interfaces/Measurement';
import MedicaoMD30 from './MedicaoMD30';
import MedidorMD30 from './MedidorMD30';
import Taxes, { TaxType } from './Taxes';
import { measurementAcumulator } from './util/helpers';

export default class Bill {
  private consumosAtivosPonta: Array<MedicaoMD30>;
  private consumosAtivosForaPonta: Array<MedicaoMD30>;
  private demandasAtivasPonta: Array<MedicaoMD30>;
  private demandasAtivasForaPonta: Array<MedicaoMD30>;

  consumoAtivoPontaMedido: number;
  consumoAtivoForaPontaMedido: number;
  demandaAtivaPontaMedida: number;
  demandaAtivaForaPontaMedida: number;
  // consumoReativoExcedentePonta: number;
  // consumoReativoExcedenteForaPonta: number;
  // demandaReativaExcedentePonta: number;
  // demandaReativaExcedenteForaPonta: number;

  constructor(
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
    [ this.consumosAtivosPonta, this.consumosAtivosForaPonta ] =
      this.splitPontaAndForaPonta(consumosAtivos);
    [ this.demandasAtivasPonta, this.demandasAtivasForaPonta ] =
      this.splitPontaAndForaPonta(demandasAtivas);
    // console.log(this.consumosAtivosPonta)
    this.consumoAtivoPontaMedido = this.calculateConsumoAtivoPonta();
    this.consumoAtivoForaPontaMedido = this.calculateConsumoAtivoForaPonta();
    this.demandaAtivaPontaMedida = this.calculateDemandaAtivaPonta();
    this.demandaAtivaForaPontaMedida = this.calculateDemandaAtivaForaPonta();
    // this.consumoReativoExcedentePonta =
    //   this.calculateConsumoReativoExcedentePonta();
    // this.consumoReativoExcedenteForaPonta =
    //   this.calculateConsumoReativoExcedenteForaPonta();
    // this.demandaReativaExcedentePonta =
    //   this.calculateDemandaReativaExcedentePonta();
    // this.demandaReativaExcedenteForaPonta =
    //   this.calculateDemandaReativaExcedenteForaPonta();
  }

  simulate(): number {
    const consumoAtivoPrice =
      this.consumoAtivoPontaMedido * this.taxes.consumoPonta +
      this.consumoAtivoForaPontaMedido * this.taxes.consumoForaPonta;
    const demandaAtivaPrice =
      this.taxes.type === TaxType.AZUL
        ? this.demandaAtivaPontaMedida * this.taxes.demandaPonta +
        this.demandaAtivaForaPontaMedida * this.taxes.demandaForaPonta
        : (this.demandaAtivaPontaMedida + this.demandaAtivaForaPontaMedida) *
        this.taxes.demandaUnica;
    // const consumoReativoExcedentePrice =
    //   this.consumoReativoExcedentePonta * this.taxes.consumoPonta +
    //   this.consumoReativoExcedenteForaPonta * this.taxes.consumoForaPonta;
    // const demandaReativaExcedentePrice =
    //   this.taxes.type === TaxType.AZUL
    //     ? this.demandaReativaExcedentePonta * this.taxes.demandaPonta +
    //       this.demandaReativaExcedenteForaPonta * this.taxes.demandaForaPonta
    //     : (this.demandaReativaExcedentePonta +
    //         this.demandaReativaExcedenteForaPonta) *
    //       this.taxes.demandaUnica;

    return (
      consumoAtivoPrice +
      demandaAtivaPrice
      // consumoReativoExcedentePrice +
      // demandaReativaExcedentePrice
    );
  }

  private calculateConsumoAtivoPonta(): number {
    console.log('ConsumoPonta', this.consumosAtivosPonta.reduce(
      (acc, current) => acc + measurementAcumulator(current),
      0
    ))
    return this.consumosAtivosPonta.reduce(
      (acc, current) => acc + measurementAcumulator(current),
      0
    );
  }

  private calculateConsumoAtivoForaPonta(): number {
    console.log('ConsumoForaPonta', this.consumosAtivosForaPonta.reduce(
      (acc, current) => acc + measurementAcumulator(current),
      0
    ))
    return this.consumosAtivosForaPonta.reduce(
      (acc, current) => acc + measurementAcumulator(current),
      0
    );
  }

  private calculateDemandaAtivaPonta(): number {
    console.log('DemandaPonta', this.demandasAtivasPonta.reduce(
      (acc, current) => acc + measurementAcumulator(current),
      0
    ))
    return this.demandasAtivasPonta.reduce(
      (acc, current) => acc + measurementAcumulator(current),
      0
    );
  }

  private calculateDemandaAtivaForaPonta(): number {
    console.log('DemandaForaPonta', this.demandasAtivasForaPonta.reduce(
      (acc, current) => acc + measurementAcumulator(current),
      0
    ))
    return this.demandasAtivasForaPonta.reduce(
      (acc, current) => acc + measurementAcumulator(current),
      0
    );
  }

  // private calculateConsumoReativoExcedentePonta(): number {
  //   let total = 0;
  //   const fatorPotenciaHorario = 0;

  //   this.consumosAtivosPonta.forEach((consumo) => {
  //     total +=
  //       consumo.values.get('Consumo Ativo (kWh)') ??
  //       0 * (0.92 / fatorPotenciaHorario - 1);
  //   });

  //   return total;
  // }

  // private calculateConsumoReativoExcedenteForaPonta(): number {
  //   let total = 0;
  //   const fatorPotenciaHorario = 0;

  //   this.consumosAtivosForaPonta.forEach((consumo) => {
  //     total +=
  //       consumo.values.get('Consumo Ativo (kWh)') ??
  //       0 * (0.92 / fatorPotenciaHorario - 1);
  //   });

  //   return total;
  // }

  // private calculateDemandaReativaExcedentePonta(): number {
  //   let max = 0;
  //   const fatorPotenciaHorario = 0;

  //   this.demandasAtivasPonta.forEach((demanda) => {
  //     const calc =
  //       demanda.values.get('Demanda Ativa (kV)') ??
  //       (0 * 0.92) / fatorPotenciaHorario;
  //     if (max < calc) max = calc;
  //   });

  //   return max - this.demandaContratada;
  // }

  // private calculateDemandaReativaExcedenteForaPonta(): number {
  //   let max = 0;
  //   const fatorPotenciaHorario = 0;

  //   this.demandasAtivasForaPonta.forEach((demanda) => {
  //     const calc =
  //       demanda.values.get('Demanda Ativa (kV)') ??
  //       (0 * 0.92) / fatorPotenciaHorario;
  //     if (max < calc) max = calc;
  //   });

  //   return max - this.demandaContratada;
  // }

  private splitPontaAndForaPonta(
    measurements: Array<Measurement>
  ): [ Array<Measurement>, Array<Measurement> ] {
    const insidePonta = new Array<Measurement>();
    const outsidePonta = new Array<Measurement>();
    for (const measurement of measurements) {
      if (this.medidor.isInsideRushHour(measurement, this.holidays))
        insidePonta.push(measurement);
      else outsidePonta.push(measurement);
    }
    return [ insidePonta, outsidePonta ];
  }
}
