import Holiday from "@src/entities/Holiday";

export default interface HolidayRepository {
  addHoliday(name: string, day: Date): void;
  deleteHoliday(id: number): void;
  getHolidayByID(id: number): Promise<Holiday>;
  getHolidayByName(name: string): Promise<Holiday>;
  getAllHolidays(): Promise<Array<Holiday>>;
}