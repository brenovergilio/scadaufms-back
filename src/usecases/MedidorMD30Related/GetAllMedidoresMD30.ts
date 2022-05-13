import MedidorMD30 from '@src/entities/MedidorMD30';
import BaseMedidorMD30UseCases from './BaseMedidorMD30UseCases';

export default class GetAllMedidoresMD30 extends BaseMedidorMD30UseCases {
  async execute(): Promise<Array<MedidorMD30>> {
    return await this.medidorMD30Repository.getAllMedidoresMD30();
  }
}
