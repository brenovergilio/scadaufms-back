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

    const taxes = await this.taxesRepository.getSpecificTax(input.type);

    const holidays = await this.holidayRepository.getAllHolidays();

    const consumosAtivos =
      await this.medicaoMD30Repository.getConsumosAtivosPerDateRange(
        input.medidorID,
        3600,
        input.dateRange
      );
    const consumosReativos =
      await this.medicaoMD30Repository.getConsumosReativosPerDateRange(
        input.medidorID,
        3600,
        input.dateRange
      );
    const demandasAtivas =
      await this.medicaoMD30Repository.getDemandasAtivasPerDateRange(
        input.medidorID,
        3600,
        input.dateRange
      );
    const demandasReativas =
      await this.medicaoMD30Repository.getDemandasReativasPerDateRange(
        input.medidorID,
        3600,
        input.dateRange
      );

    const bill = new Bill(
      input.demandaContratada,
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
