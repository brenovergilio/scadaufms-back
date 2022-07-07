import AlreadyExistsError from '../util/errors/AlreadyExistsError';
import { existsByIP } from '../util/validators/MedidorMD30Validator';
import MedidorMD30 from '@src/entities/MedidorMD30';
import ConnectionTimedOutError from '../util/errors/ConnectionTimedOutError';
import BaseMedidorMD30UseCases from './BaseMedidorMD30UseCases';
import { InputAddMedidorMD30 } from './Inputs';
import { validateAuthenticatedAdmin } from '../util/validators/UserValidator';
import InvalidRushError from '@src/entities/util/errors/InvalidRushError';
import { isValidRush } from '@src/entities/util/validators/RushValidator';

export default class AddMedidorMD30 extends BaseMedidorMD30UseCases {
  async execute(input: InputAddMedidorMD30): Promise<MedidorMD30> {
    await validateAuthenticatedAdmin(input.sourceUserID, this.userRepository);

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
    );

    if (input.rushHour !== undefined) newMedidorMD30.rush.hour = input.rushHour;
    if (input.rushMinute !== undefined)
      newMedidorMD30.rush.minute = input.rushMinute;
    if (input.rushInterval !== undefined)
      newMedidorMD30.rush.interval = input.rushInterval;

    if (!isValidRush(newMedidorMD30.rush)) throw new InvalidRushError();

    return this.medidorMD30Repository.addMedidorMD30(newMedidorMD30);
  }
}
