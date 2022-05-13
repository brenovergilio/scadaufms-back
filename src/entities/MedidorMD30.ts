import { v4 } from 'uuid';
import Measurer from './interfaces/Measurer';
import Rush from './interfaces/Rush';
import { isValidRush } from './util/validators/RushValidator';

export default class MedidorMD30 implements Measurer {
  constructor(
    public ip: string,
    public name: string,
    public port: number,
    public rush: Rush = { hour: 17, minute: 30, interval: 3 },
    public id: string = v4()
  ) {
    isValidRush(rush);
  }
}
