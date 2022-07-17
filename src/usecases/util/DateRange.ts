import InvalidDateRangeError from '../../infra/errors/InvalidDateRangeError';
import isValidDateRange from './validators/DateRangeValidator';

export default class DateRange {
  initialDate: Date;
  finalDate: Date;

  constructor(initialDate: Date, finalDate: Date) {
    if (!isValidDateRange(initialDate, finalDate))
      throw new InvalidDateRangeError();

    this.initialDate = initialDate;
    this.finalDate = finalDate;
  }
}
