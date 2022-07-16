import { v4 } from 'uuid';
import Holiday from './Holiday';
import Measurement from './interfaces/Measurement';
import Measurer from './interfaces/Measurer';
import Rush from './interfaces/Rush';
import {
  convertBrazilianDateStringToDate,
  datesMatch,
  DayOfWeek,
} from './util/helpers';
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

  public splitPontaAndForaPonta(
    measurements: Array<Measurement>,
    holidays: Array<Holiday>
  ): [ Array<Measurement>, Array<Measurement> ] {
    const insidePonta = new Array<Measurement>();
    const outsidePonta = new Array<Measurement>();
    for (const measurement of measurements) {
      if (this.isInsideRushHour(measurement, holidays))
        insidePonta.push(measurement);
      else outsidePonta.push(measurement);
    }
    return [ insidePonta, outsidePonta ];
  }

  isInsideRushHour(
    measurement: Measurement,
    holidays: Array<Holiday>
  ): boolean {
    if (typeof measurement.timestamp === 'string')
      measurement.timestamp = convertBrazilianDateStringToDate(
        measurement.timestamp
      );

    const dayOfWeek = measurement.timestamp.getUTCDay();

    if (dayOfWeek === DayOfWeek.SATURDAY || dayOfWeek === DayOfWeek.SUNDAY)
      return false;

    for (const holiday of holidays)
      if (datesMatch(holiday.day, measurement.timestamp)) return false;

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
