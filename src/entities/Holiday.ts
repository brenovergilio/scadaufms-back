import { v4 } from 'uuid';

export default class Holiday {
  constructor(
    public name: string,
    public day: Date,
    public id: string = v4()
  ) {}
}
