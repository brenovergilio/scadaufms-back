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

router.get("/medidores", ExpressAdapter.create(MedidorMD30Controller.getAllMedidoresMD30, medidorMD30Repository));
router.get("/medidores/:ip", ExpressAdapter.create(MedidorMD30Controller.getMedidorMD30ByIP, medidorMD30Repository));
router.delete("/medidores/:ip", ExpressAdapter.create(MedidorMD30Controller.deleteMedidorMD30, medidorMD30Repository));
router.post("/medidores", ExpressAdapter.create(MedidorMD30Controller.addMedidorMD30, medidorMD30Repository));


router.get("/medicoes/tensoes/:measurerIP", ExpressAdapter.create(MedicaoMD30Controller.getTensoesPerDateRange, medicaoMD30Repository));
router.get("/medicoes/correntes/:measurerIP", ExpressAdapter.create(MedicaoMD30Controller.getCorrentesPerDateRange, medicaoMD30Repository));
router.get("/medicoes/potencias-ativas/:measurerIP", ExpressAdapter.create(MedicaoMD30Controller.getPotenciasAtivasPerDateRange, medicaoMD30Repository));
router.get("/medicoes/potencias-reativas/:measurerIP", ExpressAdapter.create(MedicaoMD30Controller.getPotenciasReativasPerDateRange, medicaoMD30Repository));
router.get("/medicoes/potencias-aparentes/:measurerIP", ExpressAdapter.create(MedicaoMD30Controller.getPotenciasAparentesPerDateRange, medicaoMD30Repository));
router.get("/medicoes/fatores-potencia/:measurerIP", ExpressAdapter.create(MedicaoMD30Controller.getFatoresDePotenciaPerDateRange, medicaoMD30Repository));

router.get("/holidays", ExpressAdapter.create(HolidayController.getAllHolidays, holidayRepository));
router.delete("/holidays/:id", ExpressAdapter.create(HolidayController.deleteHoliday, holidayRepository));
router.post("/holidays", ExpressAdapter.create(HolidayController.addHoliday, holidayRepository));

router.get("/alarms/:measurerIP", ExpressAdapter.create(AlarmController.getAllAlarmsForSpecificMeasurer, alarmRepository));
router.delete("/alarms/:id", ExpressAdapter.create(AlarmController.deleteAlarm, alarmRepository));

export { router };