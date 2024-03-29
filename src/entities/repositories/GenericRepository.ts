import AlarmRepository from './AlarmRepository';
import HolidayRepository from './HolidayRepository';
import MedicaoMD30Repository from './MedicaoMD30Repository';
import MedidorMD30Repository from './MedidorMD30Repository';
import TaxesRepository from './TaxesRepository';
import UserRepository from './UserRepository';

export type GenericRepository =
  | AlarmRepository
  | HolidayRepository
  | MedicaoMD30Repository
  | MedidorMD30Repository
  | UserRepository
  | TaxesRepository;
