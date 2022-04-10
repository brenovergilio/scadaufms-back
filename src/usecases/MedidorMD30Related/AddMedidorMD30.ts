import Rush from '@src/entities/interfaces/Rush';
import { validateMedidorMD30Params } from '@src/entities/util/EntityFieldsValidators';
import AlreadyExistsError from '../util/errors/AlreadyExistsError';
import MedidorMD30Repository from '../repositories/MedidorMD30Repository';
import { existsByIP } from '../util/validators/MedidorMD30Validator';
import MedidorMD30 from '@src/entities/MedidorMD30';
import ModbusRTU from 'modbus-serial';
import MeasurerChecker from '@src/entities/interfaces/MeasurerChecker';
import ConnectionTimedOutError from '../util/errors/ConnectionTimedOutError';

export default class AddMedidorMD30 {
  medidorMD30Repository: MedidorMD30Repository;

  constructor(medidorMD30Repository: MedidorMD30Repository) {
    this.medidorMD30Repository = medidorMD30Repository;
  }

  async execute(
    ip: string,
    name: string,
    port: number,
    measurerChecker: MeasurerChecker,
    rush: Rush = { hour: 17, minute: 30, interval: 3 }
  ): Promise<MedidorMD30> {
    validateMedidorMD30Params(ip, name, port, rush);

    const isOpen: boolean = await measurerChecker.isOpen(ip, port); 
    
    if(!isOpen)
      throw new ConnectionTimedOutError();

    const medidorMD30Exists: boolean = await existsByIP(
      ip,
      this.medidorMD30Repository
    );

    if (medidorMD30Exists) throw new AlreadyExistsError();

    const medidorMD30: MedidorMD30 =
      await this.medidorMD30Repository.addMedidorMD30(
        ip,
        name,
        port,
        rush.hour,
        rush.minute,
        rush.interval
      );
    return medidorMD30;
  }
}
