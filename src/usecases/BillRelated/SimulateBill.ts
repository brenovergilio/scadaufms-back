import NotFoundError from '../util/errors/NotFoundError';
import BaseBillUseCases from './BaseBillUseCases';
import { SimulateBillInput } from './Inputs';
import Bill from '@src/entities/Bill';

export default class SimulateBill extends BaseBillUseCases {
  async execute(input: SimulateBillInput): Promise<number> {
    const medidor = await this.medidorMD30Repository.getMedidorMD30ByID(
      input.medidorID
    );

    if (!medidor) throw new NotFoundError();

    const demandaContratadaInKw = input.demandaContratada * 1000;

    const taxes = await this.taxesRepository.getSpecificTax(input.type);

    const holidays = await this.holidayRepository.getAllHolidays();

    const consumosAtivos =
      await this.medicaoMD30Repository.getConsumosAtivosPerDateRange(
        input.medidorID,
        900,
        input.dateRange
      );
    const consumosReativos =
      await this.medicaoMD30Repository.getConsumosReativosPerDateRange(
        input.medidorID,
        900,
        input.dateRange
      );
    const demandasAtivas =
      await this.medicaoMD30Repository.getDemandasAtivasPerDateRange(
        input.medidorID,
        900,
        input.dateRange
      );
    const demandasReativas =
      await this.medicaoMD30Repository.getDemandasReativasPerDateRange(
        input.medidorID,
        900,
        input.dateRange
      );

    const bill = new Bill(
      demandaContratadaInKw,
      holidays,
      consumosAtivos,
      consumosReativos,
      demandasAtivas,
      demandasReativas,
      medidor,
      taxes!
    );

    return bill.simulate();
  }
}
