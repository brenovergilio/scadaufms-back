import NotFoundError from '../util/errors/NotFoundError';
import BaseBillUseCases from './BaseBillUseCases';
import { SimulateBillInput } from './Inputs';
import Bill from '@src/entities/Bill';
import MedidorMD30 from '@src/entities/MedidorMD30';
import DateRange from '../util/DateRange';
import { measurementAcumulator } from '@src/entities/util/helpers';

export default class SimulateBill extends BaseBillUseCases {
  async execute(input: SimulateBillInput): Promise<number> {
    const medidores = new Array<MedidorMD30 | null>();

    input.medidoresID.forEach(async (medidorID) => medidores.push(await this.medidorMD30Repository.getMedidorMD30ByID(
      medidorID
    )));

    if (medidores.some((medidor) => medidor === null)) throw new NotFoundError();

    const taxes = await this.taxesRepository.getSpecificTax(input.type);

    const holidays = await this.holidayRepository.getAllHolidays();

    let dayByDay = new DateRange(input.dateRange.initialDate, input.dateRange.initialDate);
    let consumoPontaTotal = 0;
    let consumoForaPontaTotal = 0;
    let demandaPontaTotal = 0;
    let demandaForaPontaTotal = 0;
    while (dayByDay.finalDate <= input.dateRange.finalDate) {
      const totalDemandasPontaArrayPerDay = [];
      const totalDemandasForaPontaArrayPerDay = [];
      for (const medidor of medidores) {
        const consumosAtivos =
          await this.medicaoMD30Repository.getConsumosAtivosPerDateRange(
            medidor!.id,
            900,
            dayByDay
          );

        const [ consumosAtivosPonta, consumosAtivosForaPonta ] = medidor!.splitPontaAndForaPonta(consumosAtivos, holidays);
        const mediaConsumosPonta = consumosAtivosPonta.reduce((acc, curr) => acc + measurementAcumulator(curr), 0) / consumosAtivosPonta.length;
        const mediaConsumosForaPonta = consumosAtivosForaPonta.reduce((acc, curr) => acc + measurementAcumulator(curr), 0) / consumosAtivosForaPonta.length;
        consumoPontaTotal += mediaConsumosPonta * medidor!.rush.interval;
        consumoForaPontaTotal += mediaConsumosForaPonta * (24 - medidor!.rush.interval);

        const demandasAtivas =
          await this.medicaoMD30Repository.getDemandasAtivasPerDateRange(
            medidor!.id,
            900,
            dayByDay
          );

        const [ demandasAtivasPonta, demandasAtivasForaPonta ] = medidor!.splitPontaAndForaPonta(demandasAtivas, holidays);
        totalDemandasPontaArrayPerDay.push(demandasAtivasPonta);
        totalDemandasForaPontaArrayPerDay.push(demandasAtivasForaPonta);
      }
      const demandasPontaSomada = []


      // let j=0;
      // while(j < totalDemandasForaPontaArrayPerDay[j].length) {
      //   let i=0;
      //   let demandaSomada = 0;
      //   const timestamp = totalDemandasForaPontaArrayPerDay[i][j].timestamp;
      //   while(i < totalDemandasForaPontaArrayPerDay.length) {
      //     demandaSomada += totalDemandasForaPontaArrayPerDay[i][j]!.values.get('teste')
      //   }
      // }
      // for(let i=0; i<totalDemandasPontaArrayPerDay.length; i++) {
      //   for(let j=0; j<totalDemandasForaPontaArrayPerDay[i].length; j++) {
      //     const x = totalDemandasForaPontaArrayPerDay[i][j].
      //   }
      // }
      //date.setDate(date.getDate() + 1);
    }

    // const bill = new Bill(
    //   holidays,
    //   consumosAtivos,
    //   consumosReativos,
    //   demandasAtivas,
    //   demandasReativas,
    //   medidor,
    //   taxes!
    // );

    //return bill.simulate();
    return 0;
  }
}
