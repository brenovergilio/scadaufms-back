import ExpressAdapter from "@src/infra/adapters/ExpressAdapter";
import MedidorMD30Controller from "@src/infra/controllers/MedidorMD30Controller";
import { Router } from "express";

const router: Router  = Router(); 

router.get("/medidores", ExpressAdapter.create(MedidorMD30Controller.listAllMedidoresMD30));

export { router };