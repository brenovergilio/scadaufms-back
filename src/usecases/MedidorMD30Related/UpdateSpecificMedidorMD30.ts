import MedidorMD30 from "@src/entities/MedidorMD30";
import NotFoundError from "../util/errors/NotFoundError";
import { validateAuthenticatedAdmin } from "../util/validators/UserValidator";
import BaseMedidorMD30UseCases from "./BaseMedidorMD30UseCases";
import { InputUpdateSpecificMedidorMD30 } from "./Inputs";

export default class UpdateSpecificMedidorMD30 extends BaseMedidorMD30UseCases {
  async execute(input: InputUpdateSpecificMedidorMD30): Promise<MedidorMD30> {
    await validateAuthenticatedAdmin(input.sourceUserID, this.userRepository);

    const medidorMD30 = await this.medidorMD30Repository.getMedidorMD30ByID(input.medidorID);
    if(!medidorMD30) throw new NotFoundError();

    if(input.ip) medidorMD30.ip = input.ip;
    if(input.name) medidorMD30.name = input.name;
    if(input.port) medidorMD30.port = input.port;
    if(input.rush) medidorMD30.rush = input.rush;

    return this.medidorMD30Repository.updateMedidorMD30ByID(medidorMD30);
  }
}