import AlarmRepositorySQL from './postgres/AlarmRepositorySQL';
import HolidayRepositorySQL from './postgres/HolidayRepositorySQL';
import MedicaoMD30RepositorySQL from './postgres/MedicaoMD30RepositorySQL';
import MedidorMD30RepositorySQL from './postgres/MedidorMD30RepositorySQL';
import TaxesRepositorySQL from './postgres/TaxesRepositorySQL';
import UserRepositorySQL from './postgres/UserRepositorySQL';

const repos = {
  alarms: new AlarmRepositorySQL(),
  holidays: new HolidayRepositorySQL(),
  medidoresMD30: new MedidorMD30RepositorySQL(),
  medicoesMD30: new MedicaoMD30RepositorySQL(),
  users: new UserRepositorySQL(),
  taxes: new TaxesRepositorySQL(),
};

export default repos;
