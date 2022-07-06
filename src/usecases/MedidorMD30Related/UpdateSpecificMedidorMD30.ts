import MedidorMD30 from "@src/entities/MedidorMD30";
import InvalidRushError from "@src/entities/util/errors/InvalidRushError";
import { isValidRush } from "@src/entities/util/validators/RushValidator";
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
    if(input.port !== undefined) medidorMD30.port = input.port;
    if(input.rushHour !== undefined) medidorMD30.rush.hour = input.rushHour;
    if(input.rushMinute !== undefined) medidorMD30.rush.minute = input.rushMinute;
    if(input.rushInterval !== undefined) medidorMD30.rush.interval = input.rushInterval;

    if(!isValidRush(medidorMD30.rush)) throw new InvalidRushError();

    return this.medidorMD30Repository.updateMedidorMD30ByID(medidorMD30);
  }
}