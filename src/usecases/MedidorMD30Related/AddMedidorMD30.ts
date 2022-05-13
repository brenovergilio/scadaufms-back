import AlreadyExistsError from '../util/errors/AlreadyExistsError';
import { existsByIP } from '../util/validators/MedidorMD30Validator';
import MedidorMD30 from '@src/entities/MedidorMD30';
import ConnectionTimedOutError from '../util/errors/ConnectionTimedOutError';
import BaseMedidorMD30UseCases from './BaseMedidorMD30UseCases';
import { InputAddMedidorMD30 } from './Inputs';
import { validateAuthenticatedAdmin } from '../util/validators/UserValidator';

export default class AddMedidorMD30 extends BaseMedidorMD30UseCases {
  async execute(input: InputAddMedidorMD30): Promise<MedidorMD30> {
    await validateAuthenticatedAdmin(input.userID, this.userRepository);

    const isOpen: boolean = await input.measurerChecker.isOpen(
      input.ip,
      input.port
    );

    if (!isOpen) throw new ConnectionTimedOutError();

    const medidorMD30Exists: boolean = await existsByIP(
      input.ip,
      this.medidorMD30Repository
    );

    if (medidorMD30Exists) throw new AlreadyExistsError();

    const newMedidorMD30: MedidorMD30 = new MedidorMD30(
      input.ip,
      input.name,
      input.port,
      input.rush
    );

    return await this.medidorMD30Repository.addMedidorMD30(newMedidorMD30);
  }
}
