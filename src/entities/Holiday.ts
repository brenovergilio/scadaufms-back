import { validateHolidayParams } from './util/EntityFieldsValidators';

export default class Holiday {
  id: number;
  name: string;
  day: Date;

  constructor(id: number, name: string, day: Date) {
    validateHolidayParams(name);

    this.id = id;
    this.name = name;

    
    this.day = this.setTimeToMin(day);
  }

  // Workaround to get rid of time on javascript Date object
  private setTimeToMin(date: Date) {
    const newDate: Date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    return new Date(newDate.setUTCHours(0, 0, 0, 0));
   }
}
