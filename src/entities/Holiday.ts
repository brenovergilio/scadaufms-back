import isEmptyNameError from "./util/errors/EmptyNameError";
import { isEmptyString } from "./util/validators/StringValidators";

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