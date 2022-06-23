import InvalidDateRangeError from '../../infra/errors/InvalidDateRangeError';
import isValidDateRange from './validators/DateRangeValidator';

export default class DateRange {
  initialDate: Date;
  finalDate: Date;

  constructor(initialDate: Date, finalDate: Date) {
    initialDate = this.setTimeToMin(initialDate);
    finalDate = this.setTimeToMax(finalDate);

    if (!isValidDateRange(initialDate, finalDate))
      throw new InvalidDateRangeError();

    this.initialDate = initialDate;
    this.finalDate = finalDate;
  }

  // Workaround to get rid of time on javascript Date object

  private setTimeToMin(date: Date) {
    const newDate: Date = new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate()
    );
    return new Date(newDate.setUTCHours(0, 0, 0, 0));
  }

  private setTimeToMax(date: Date) {
    const newDate: Date = new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate()
    );
    return new Date(newDate.setUTCHours(23, 59, 59, 999));
  }
}
