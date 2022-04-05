import MedidorMD30RepositorySQL from "@src/external/repositories/postgres/MedidorMD30RepositorySQL";
import ExpressAdapter from "@src/infra/adapters/ExpressAdapter";
import MedidorMD30Controller from "@src/infra/controllers/MedidorMD30Controller";
import MedidorMD30Repository from "@src/usecases/repositories/MedidorMD30Repository";
import { Router } from "express";

const router: Router  = Router(); 
const medidorMD30Repository: MedidorMD30Repository = new MedidorMD30RepositorySQL();

router.get("/medidores", ExpressAdapter.create(MedidorMD30Controller.listAllMedidoresMD30, medidorMD30Repository));

router.post("/medidores", ExpressAdapter.create(MedidorMD30Controller.addMedidorMD30, medidorMD30Repository));

export { router };