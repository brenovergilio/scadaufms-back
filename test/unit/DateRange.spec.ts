import DateRange from "@src/usecases/util/DateRange"
import InvalidDateRangeError from "@src/usecases/util/errors/InvalidDateRangeError";

describe("DateRange instantiation", () => {
  it("Should instantiate a DateRange", () => {
    const initialDate: Date = new Date(2022, 0, 1);
    const finalDate: Date = new Date(2022, 0, 10);
    const dateRange: DateRange = new DateRange(initialDate, finalDate);

    expect(dateRange).toBeDefined();
  });

  it("Should throw an error because finalDate is less than initialDate", () => {
    const initialDate: Date = new Date(2022, 0, 10);
    const finalDate: Date = new Date(2022, 0, 1);

    expect(() => new DateRange(initialDate, finalDate)).toThrow(InvalidDateRangeError);
  });
})