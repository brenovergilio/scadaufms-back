import { v4 } from 'uuid';

export default class Alarm {
  constructor(
    public measurerID: string,
    public timestamp: Date | string,
    public message: string,
    public id: string = v4()
  ) {}
}
