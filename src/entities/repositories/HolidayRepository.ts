import Holiday from '@src/entities/Holiday';

export default interface HolidayRepository {
  addHoliday(holiday: Holiday): Promise<Holiday>;
  deleteHoliday(id: string): Promise<Holiday>;
  getHolidayByID(id: string): Promise<Holiday | null>;
  getHolidayByName(name: string): Promise<Holiday | null>;
  getAllHolidays(): Promise<Array<Holiday>>;
}
