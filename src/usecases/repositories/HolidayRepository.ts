import Holiday from '@src/entities/Holiday';

export default interface HolidayRepository {
  addHoliday(name: string, day: Date): Promise<Holiday>;
  deleteHoliday(id: number): Promise<Holiday>;
  getHolidayByID(id: number): Promise<Holiday | null>;
  getHolidayByName(name: string): Promise<Holiday | null>;
  getAllHolidays(): Promise<Array<Holiday>>;
}
