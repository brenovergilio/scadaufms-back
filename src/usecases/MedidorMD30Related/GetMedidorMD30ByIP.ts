import MedidorMD30 from '@src/entities/MedidorMD30';
import NotFoundError from '../util/errors/NotFoundError';
import BaseMedidorMD30UseCases from './BaseMedidorMD30UseCases';

export default class GetMedidorMD30ByIP extends BaseMedidorMD30UseCases {
  async execute(ip: string): Promise<MedidorMD30> {
    const medidorMD30 = await this.medidorMD30Repository.getMedidorMD30ByIP(ip);

    if (!medidorMD30) throw new NotFoundError();

    return medidorMD30;
  }
}
