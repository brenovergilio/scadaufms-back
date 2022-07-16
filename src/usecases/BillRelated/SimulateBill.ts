import NotFoundError from '../util/errors/NotFoundError';
import BaseBillUseCases from './BaseBillUseCases';
import { SimulateBillInput } from './Inputs';
import Bill from '@src/entities/Bill';
import MedidorMD30 from '@src/entities/MedidorMD30';
import DateRange from '../util/DateRange';
import Measurement from '@src/entities/interfaces/Measurement';
import { formatNumberToBRL, isEmptyArray } from '../util/helpers';
import { OutputSimulateBill } from './Output';
import { TaxType } from '@src/entities/Taxes';

export default class SimulateBill extends BaseBillUseCases {
  async execute(input: SimulateBillInput): Promise<OutputSimulateBill> {
    const medidores = new Array<MedidorMD30 | null>();

    for (const medidorID of input.medidoresID) {
      const medidor = await this.medidorMD30Repository.getMedidorMD30ByID(medidorID);
      medidores.push(medidor);
    }

    if (medidores.some((medidor) => medidor === null)) throw new NotFoundError();

    const taxAzul = await this.taxesRepository.getSpecificTax(TaxType.AZUL);
    const taxVerde = await this.taxesRepository.getSpecificTax(TaxType.VERDE);

    const holidays = await this.holidayRepository.getAllHolidays();

    let dayByDay = new DateRange(input.dateRange.initialDate, input.dateRange.initialDate);
    let consumoPontaTotal = 0;
    let consumoForaPontaTotal = 0;
    let demandaPontaTotal = 0;
    let demandaForaPontaTotal = 0;
    while (dayByDay.finalDate <= input.dateRange.finalDate) {
      const totalDemandasPontaArrayPerDay: Measurement[][] = [];
      const totalDemandasForaPontaArrayPerDay: Measurement[][] = [];
      for (const medidor of medidores) {
        const consumosAtivos =
          await this.medicaoMD30Repository.getConsumosAtivosPerDateRange(
            medidor!.id,
            900,
            dayByDay
          );
        if (isEmptyArray(consumosAtivos)) continue;
        const [ consumosAtivosPonta, consumosAtivosForaPonta ] = medidor!.splitPontaAndForaPonta(consumosAtivos, holidays);
        if (!isEmptyArray(consumosAtivosPonta))
          consumoPontaTotal += (consumosAtivosPonta.reduce((acc, curr) => acc + curr.values.values().next().value, 0) / consumosAtivosPonta.length) * medidor!.rush.interval * 4;

        if (!isEmptyArray(consumosAtivosForaPonta))
          consumoForaPontaTotal += (consumosAtivosForaPonta.reduce((acc, curr) => acc + curr.values.values().next().value, 0) / consumosAtivosForaPonta.length) * (24 - medidor!.rush.interval) * 4;
        const demandasAtivas =
          await this.medicaoMD30Repository.getDemandasAtivasPerDateRange(
            medidor!.id,
            900,
            dayByDay
          );
        if (isEmptyArray(demandasAtivas)) continue;
        const [ demandasAtivasPonta, demandasAtivasForaPonta ] = medidor!.splitPontaAndForaPonta(demandasAtivas, holidays);
        if (!isEmptyArray(demandasAtivasPonta))
          totalDemandasPontaArrayPerDay.push(demandasAtivasPonta)
        if (!isEmptyArray(demandasAtivasForaPonta))
          totalDemandasForaPontaArrayPerDay.push(demandasAtivasForaPonta)
      }
      const demandasForaPontaSomada = SimulateBill.sumDemandasByTimestamp(totalDemandasForaPontaArrayPerDay);
      const demandasPontaSomada = SimulateBill.sumDemandasByTimestamp(totalDemandasPontaArrayPerDay);

      demandaPontaTotal += Math.max(...demandasPontaSomada.map(curr => curr.values.values().next().value))
      demandaForaPontaTotal += Math.max(...demandasForaPontaSomada.map(curr => curr.values.values().next().value))
      dayByDay.initialDate.setDate(dayByDay.initialDate.getDate() + 1);
      dayByDay.finalDate.setDate(dayByDay.finalDate.getDate() + 1);
    }
    // console.log(consumoPontaTotal, consumoForaPontaTotal, demandaPontaTotal, demandaForaPontaTotal)
    // const result = Bill.simulate(taxes, 59.62, 1014.43, 13, 30);
    const valorAzul = Bill.simulate(taxAzul, consumoPontaTotal, consumoForaPontaTotal, demandaPontaTotal, demandaForaPontaTotal);
    const valorVerde = Bill.simulate(taxVerde, consumoPontaTotal, consumoForaPontaTotal, demandaPontaTotal, demandaForaPontaTotal);


    return { valorAzul: formatNumberToBRL(valorAzul), valorVerde: formatNumberToBRL(valorVerde) };
  }

  static sumDemandasByTimestamp(totalPerDay: Measurement[][]): Measurement[] {
    const demandasSomadas: Measurement[] = [];
    for (let i = 0; i < totalPerDay[ 0 ].length; i++) {
      for (let j = 0; j < totalPerDay.length; j++) {
        const currentValue = totalPerDay[ j ][ i ].values.values().next().value;
        const currentTimestamp = totalPerDay[ j ][ i ].timestamp;
        if (!demandasSomadas.some((curr) => curr.timestamp === currentTimestamp)) {
          const mapValue = new Map<string, number>();
          mapValue.set('demanda', currentValue);
          const measurement: Measurement = { measurerID: 'id', timestamp: currentTimestamp, values: mapValue };
          demandasSomadas.push(measurement);
        } else {
          const index = demandasSomadas.map((curr) => curr.timestamp).indexOf(currentTimestamp);
          demandasSomadas[ index ].values.set('demanda', demandasSomadas[ index ].values.get('demanda') + currentValue);
        }
      }
    }
    return demandasSomadas
  }
}
