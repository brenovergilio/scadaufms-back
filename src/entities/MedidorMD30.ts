import { v4 } from 'uuid';
import Holiday from './Holiday';
import Measurement from './interfaces/Measurement';
import Measurer from './interfaces/Measurer';
import Rush from './interfaces/Rush';
import { convertBrazilianDateStringToDate, datesMatch, DayOfWeek } from './util/helpers';
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

  calculateEnergiaAtiva(potenciasAtivas: Array<Measurement>): number {
    //TODO

    return 0;
  }

  calculateEnergiaReativa(potenciasReativas: Array<Measurement>): number {
    //TODO

    return 0;
  }

  isInsideRushHour(
    measurement: Measurement,
    holidays: Array<Holiday>
  ): boolean {
    if (typeof measurement.timestamp === 'string')
      measurement.timestamp = convertBrazilianDateStringToDate(measurement.timestamp);

    const dayOfWeek = measurement.timestamp.getUTCDay();

    if (dayOfWeek === DayOfWeek.SATURDAY || dayOfWeek === DayOfWeek.SUNDAY)
      return false;

    for (let holiday of holidays)
      if (datesMatch(holiday.day, measurement.timestamp as Date)) return false;

    const finalHour = this.rush.hour + this.rush.interval;
    const measurementHour = measurement.timestamp.getUTCHours();
    const measurementMinute = measurement.timestamp.getUTCMinutes();

    if (measurementHour < this.rush.hour || measurementHour > finalHour)
      return false;

    if (
      (measurementHour === this.rush.hour &&
        measurementMinute <= this.rush.minute) ||
      (measurementHour === finalHour && measurementMinute > this.rush.minute)
    )
      return false;

    return true;
  }
}
