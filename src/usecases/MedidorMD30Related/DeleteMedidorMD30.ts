import NotFoundError from '../util/errors/NotFoundError';
import { existsByID } from '../util/validators/MedidorMD30Validator';
import MedidorMD30 from '@src/entities/MedidorMD30';
import BaseMedidorMD30UseCases from './BaseMedidorMD30UseCases';
import { InputDeleteMedidorMD30 } from './Inputs';
import { validateAuthenticatedAdmin } from '../util/validators/UserValidator';

export default class DeleteMedidorMD30 extends BaseMedidorMD30UseCases {
  async execute(input: InputDeleteMedidorMD30): Promise<MedidorMD30> {
    await validateAuthenticatedAdmin(input.sourceUserID, this.userRepository);

    const medidorMD30Exists: boolean = await existsByID(
      input.medidorID,
      this.medidorMD30Repository
    );

    if (!medidorMD30Exists) throw new NotFoundError();

    return this.medidorMD30Repository.deleteMedidorMD30(input.medidorID);
  }
}
