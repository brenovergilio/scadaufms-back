import InvalidDateRangeError from "./errors/InvalidDateRangeError";
import isValidDateRange from "./validators/DateRangeValidator";

export default class DateRange {
  initialDate: Date;
  finalDate: Date;

  constructor(initialDate: Date, finalDate: Date) {
    if(!isValidDateRange(this))
      throw new InvalidDateRangeError();
    
    this.initialDate = initialDate;
    this.finalDate = finalDate;
  }
}