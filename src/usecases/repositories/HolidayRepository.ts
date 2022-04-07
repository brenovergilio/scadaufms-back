import Holiday from "@src/entities/Holiday";

export default interface HolidayRepository {
  addHoliday(name: string, day: Date): void;
  deleteHoliday(id: number): void;
  getAllHolidays(): Promise<Array<Holiday>>;
}