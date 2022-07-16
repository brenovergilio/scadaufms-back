import HolidayRepository from '@src/entities/repositories/HolidayRepository';
import MedicaoMD30Repository from '@src/entities/repositories/MedicaoMD30Repository';
import MedidorMD30Repository from '@src/entities/repositories/MedidorMD30Repository';
import TaxesRepository from '@src/entities/repositories/TaxesRepository';
import { SimulateBillInput } from '@src/usecases/BillRelated/Inputs';
import SimulateBill from '@src/usecases/BillRelated/SimulateBill';
import DateRange from '@src/usecases/util/DateRange';
import BaseController from './BaseController';

export default class BillController extends BaseController {
  static async simulateBill(
    params: any,
    body: any,
    query: any,
    headers: any,
    medidorMD30Repository: MedidorMD30Repository,
    medicaoMD30Repository: MedicaoMD30Repository,
    holidayRepository: HolidayRepository,
    taxesRepository: TaxesRepository
  ): Promise<number> {
    const { type, initialDate, finalDate, ...medidoresID } = query;

    const dateRange: DateRange = new DateRange(
      new Date(initialDate),
      new Date(finalDate)
    );

    const input: SimulateBillInput = new SimulateBillInput(
      Number.parseInt(type),
      dateRange,
      Object.values(medidoresID)
    );

    await BaseController.validateInput(input);

    const simulateBill = new SimulateBill(
      holidayRepository,
      medicaoMD30Repository,
      medidorMD30Repository,
      taxesRepository
    );
    return simulateBill.execute(input);
  }
}
