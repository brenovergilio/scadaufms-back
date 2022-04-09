import HolidayRepositorySQL from "@src/external/repositories/postgres/HolidayRepositorySQL";
import MedicaoMD30RepositorySQL from "@src/external/repositories/postgres/MedicaoMD30RepositorySQL";
import MedidorMD30RepositorySQL from "@src/external/repositories/postgres/MedidorMD30RepositorySQL";
import ExpressAdapter from "@src/infra/adapters/ExpressAdapter";
import HolidayController from "@src/infra/controllers/HolidayController";
import MedicaoMD30Controller from "@src/infra/controllers/MedicaoMD30Controller";
import MedidorMD30Controller from "@src/infra/controllers/MedidorMD30Controller";
import MedicaoMD30Repository from "@src/usecases/repositories/MedicaoMD30Repository";
import MedidorMD30Repository from "@src/usecases/repositories/MedidorMD30Repository";
import HolidayRepository from "@src/usecases/repositories/HolidayRepository";
import { Router } from "express";
import AlarmController from "@src/infra/controllers/AlarmController";
import AlarmRepositorySQL from "@src/external/repositories/postgres/AlarmRepositorySQL";
import AlarmRepository from "@src/usecases/repositories/AlarmRepository";

const router: Router  = Router(); 
const medidorMD30Repository: MedidorMD30Repository = new MedidorMD30RepositorySQL();
const medicaoMD30Repository: MedicaoMD30Repository = new MedicaoMD30RepositorySQL();
const holidayRepository: HolidayRepository = new HolidayRepositorySQL();
const alarmRepository: AlarmRepository = new AlarmRepositorySQL();

router.get("/medidores", ExpressAdapter.create(MedidorMD30Controller.getAllMedidoresMD30, medidorMD30Repository, 200));
router.get("/medidores/:id", ExpressAdapter.create(MedidorMD30Controller.getMedidorMD30ByID, medidorMD30Repository, 200));
router.get("/medidores/:ip", ExpressAdapter.create(MedidorMD30Controller.getMedidorMD30ByIP, medidorMD30Repository, 200));
router.delete("/medidores/:id", ExpressAdapter.create(MedidorMD30Controller.deleteMedidorMD30, medidorMD30Repository, 200));
router.post("/medidores", ExpressAdapter.create(MedidorMD30Controller.addMedidorMD30, medidorMD30Repository, 201));


router.get("/medicoes/tensoes/:measurerID", ExpressAdapter.create(MedicaoMD30Controller.getTensoesPerDateRange, medicaoMD30Repository, 200));
router.get("/medicoes/correntes/:measurerID", ExpressAdapter.create(MedicaoMD30Controller.getCorrentesPerDateRange, medicaoMD30Repository, 200));
router.get("/medicoes/potencias-ativas/:measurerID", ExpressAdapter.create(MedicaoMD30Controller.getPotenciasAtivasPerDateRange, medicaoMD30Repository, 200));
router.get("/medicoes/potencias-reativas/:measurerID", ExpressAdapter.create(MedicaoMD30Controller.getPotenciasReativasPerDateRange, medicaoMD30Repository, 200));
router.get("/medicoes/potencias-aparentes/:measurerID", ExpressAdapter.create(MedicaoMD30Controller.getPotenciasAparentesPerDateRange, medicaoMD30Repository, 200));
router.get("/medicoes/fatores-potencia/:measurerID", ExpressAdapter.create(MedicaoMD30Controller.getFatoresDePotenciaPerDateRange, medicaoMD30Repository, 200));

router.get("/holidays", ExpressAdapter.create(HolidayController.getAllHolidays, holidayRepository, 200));
router.get("/holidays/:id", ExpressAdapter.create(HolidayController.getHolidayByID, holidayRepository, 200));
router.get("/holidays:name", ExpressAdapter.create(HolidayController.getHolidayByName, holidayRepository, 200));
router.delete("/holidays/:id", ExpressAdapter.create(HolidayController.deleteHoliday, holidayRepository, 200));
router.post("/holidays", ExpressAdapter.create(HolidayController.addHoliday, holidayRepository, 201));

router.get("/alarms/:measurerID", ExpressAdapter.create(AlarmController.getAllAlarmsForSpecificMeasurer, alarmRepository, 200));
router.get("/alarms/:measuererID/:id", ExpressAdapter.create(AlarmController.getAlarmByID, alarmRepository, 200));
router.delete("/alarms/:id", ExpressAdapter.create(AlarmController.deleteAlarm, alarmRepository, 200));

export { router };