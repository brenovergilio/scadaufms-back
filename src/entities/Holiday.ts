import isEmptyNameError from "./errors/EmptyNameError";
import { isEmptyString } from "./validators/StringValidators";

export default class Holiday {
  id: number;
  name: string;
  day: Date;

  constructor(id: number, name: string, day:Date) {
    this.id = id;

    if(isEmptyString(name))
      throw new isEmptyNameError();
    
    this.name = name;
    this.day = day;
  }
}