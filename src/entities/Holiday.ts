import { validateHolidayParams } from "./util/EntityFieldsValidators";

export default class Holiday {
  id: number;
  name: string;
  day: Date;

  constructor(id: number, name: string, day:Date) {
    validateHolidayParams(name);

    this.id = id;
    this.name = name;
    this.day = day;
  }
}