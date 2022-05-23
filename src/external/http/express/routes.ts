import ExpressAdapter from '@src/infra/adapters/ExpressAdapter';
import HolidayController from '@src/infra/controllers/HolidayController';
import MedicaoMD30Controller from '@src/infra/controllers/MedicaoMD30Controller';
import MedidorMD30Controller from '@src/infra/controllers/MedidorMD30Controller';
import { Router } from 'express';
import AlarmController from '@src/infra/controllers/AlarmController';
import ModbusChecker from '@src/external/modbus/ModbusChecker';
import repos from '@src/external/repositories/repos';
import authChecker from './authChecker';
import UserController from '@src/infra/controllers/UserController';

const router: Router = Router();

router.post(
  '/users',
  authChecker,
  ExpressAdapter.create(UserController.createUser, 201, undefined, repos.users)
);

router.post(
  '/auth/users',
  ExpressAdapter.create(UserController.login, 200, undefined, repos.users)
);

router.get(
  '/medidores',
  authChecker,
  ExpressAdapter.create(
    MedidorMD30Controller.getAllMedidoresMD30,
    200,
    undefined,
    repos.medidoresMD30,
    repos.users
  )
);
router.get(
  '/medidores/:id',
  authChecker,
  ExpressAdapter.create(
    MedidorMD30Controller.getMedidorMD30ByID,
    200,
    undefined,
    repos.medidoresMD30,
    repos.users
  )
);
router.get(
  '/medidores/:ip',
  authChecker,
  ExpressAdapter.create(
    MedidorMD30Controller.getMedidorMD30ByIP,
    200,
    undefined,
    repos.medidoresMD30,
    repos.users
  )
);
router.delete(
  '/medidores/:id',
  authChecker,
  ExpressAdapter.create(
    MedidorMD30Controller.deleteMedidorMD30,
    200,
    undefined,
    repos.medidoresMD30,
    repos.users
  )
);
router.post(
  '/medidores',
  authChecker,
  ExpressAdapter.create(
    MedidorMD30Controller.addMedidorMD30,
    201,
    new ModbusChecker(),
    repos.medidoresMD30,
    repos.users
  )
);

router.get(
  '/:measurerID/medicoes/tensoes',
  authChecker,
  ExpressAdapter.create(
    MedicaoMD30Controller.getTensoesPerDateRange,
    200,
    undefined,
    repos.medicoesMD30
  )
);
router.get(
  '/:measurerID/medicoes/correntes',
  authChecker,
  ExpressAdapter.create(
    MedicaoMD30Controller.getCorrentesPerDateRange,
    200,
    undefined,
    repos.medicoesMD30
  )
);
router.get(
  '/:measurerID/medicoes/potencias-ativas',
  authChecker,
  ExpressAdapter.create(
    MedicaoMD30Controller.getPotenciasAtivasPerDateRange,
    200,
    undefined,
    repos.medicoesMD30
  )
);
router.get(
  '/:measurerID/medicoes/potencias-reativas',
  authChecker,
  ExpressAdapter.create(
    MedicaoMD30Controller.getPotenciasReativasPerDateRange,
    200,
    undefined,
    repos.medicoesMD30
  )
);
router.get(
  '/:measurerID/medicoes/potencias-aparentes',
  authChecker,
  ExpressAdapter.create(
    MedicaoMD30Controller.getPotenciasAparentesPerDateRange,
    200,
    undefined,
    repos.medicoesMD30
  )
);
router.get(
  '/:measurerID/medicoes/fatores-potencia',
  authChecker,
  ExpressAdapter.create(
    MedicaoMD30Controller.getFatoresDePotenciaPerDateRange,
    200,
    undefined,
    repos.medicoesMD30
  )
);

router.get(
  '/:measurerID/medicoes/demandas-ativas',
  authChecker,
  ExpressAdapter.create(
    MedicaoMD30Controller.getDemandasAtivasPerDateRange,
    200,
    undefined,
    repos.medicoesMD30
  )
);

router.get(
  '/:measurerID/medicoes/demandas-reativas',
  authChecker,
  ExpressAdapter.create(
    MedicaoMD30Controller.getDemandasReativasPerDateRange,
    200,
    undefined,
    repos.medicoesMD30
  )
);

router.get(
  '/:measurerID/medicoes/consumos-ativos',
  authChecker,
  ExpressAdapter.create(
    MedicaoMD30Controller.getConsumosAtivosPerDateRange,
    200,
    undefined,
    repos.medicoesMD30
  )
);

router.get(
  '/:measurerID/medicoes/consumos-reativos',
  authChecker,
  ExpressAdapter.create(
    MedicaoMD30Controller.getConsumosReativosPerDateRange,
    200,
    undefined,
    repos.medicoesMD30
  )
);

router.get(
  '/holidays',
  authChecker,
  ExpressAdapter.create(
    HolidayController.getAllHolidays,
    200,
    undefined,
    repos.holidays,
    repos.users
  )
);
router.get(
  '/holidays/:id',
  authChecker,
  ExpressAdapter.create(
    HolidayController.getHolidayByID,
    200,
    undefined,
    repos.holidays,
    repos.users
  )
);

router.delete(
  '/holidays/:id',
  authChecker,
  ExpressAdapter.create(
    HolidayController.deleteHoliday,
    200,
    undefined,
    repos.holidays,
    repos.users
  )
);
router.post(
  '/holidays',
  authChecker,
  ExpressAdapter.create(
    HolidayController.addHoliday,
    201,
    undefined,
    repos.holidays,
    repos.users
  )
);

router.get(
  '/:measurerID/alarms',
  authChecker,
  ExpressAdapter.create(
    AlarmController.getAllAlarmsForSpecificMeasurer,
    200,
    undefined,
    repos.alarms,
    repos.users
  )
);

router.delete(
  '/alarms/:id',
  authChecker,
  ExpressAdapter.create(
    AlarmController.deleteAlarm,
    200,
    undefined,
    repos.alarms,
    repos.users
  )
);

export { router };
