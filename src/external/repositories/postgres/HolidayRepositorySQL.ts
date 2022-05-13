import Holiday from '@src/entities/Holiday';
import db from '@src/external/database/postgres/database';
import HolidayRepository from '@src/entities/repositories/HolidayRepository';

export default class HolidayRepositorySQL implements HolidayRepository {
  async addHoliday(newHoliday: Holiday): Promise<Holiday> {
    const holidayData = await db.one(
      'INSERT INTO feriados (id, nome, dia) VALUES ($1, $2, $3) RETURNING *',
      [newHoliday.id, newHoliday.name, newHoliday.day]
    );
    const holiday: Holiday = new Holiday(
      holidayData.id,
      holidayData.nome,
      holidayData.dia
    );
    return holiday;
  }

  async deleteHoliday(id: string): Promise<Holiday> {
    const holidayData = await db.one(
      'DELETE FROM feriados WHERE id=$1 RETURNING *',
      [id]
    );
    const holiday: Holiday = new Holiday(
      holidayData.id,
      holidayData.nome,
      holidayData.dia
    );
    return holiday;
  }

  async getHolidayByID(id: string): Promise<Holiday | null> {
    const holidayData = await db.oneOrNone(
      'SELECT * FROM feriados WHERE id=$1',
      [id]
    );

    if (holidayData)
      return new Holiday(holidayData.id, holidayData.nome, holidayData.dia);

    return null;
  }

  async getHolidayByName(name: string): Promise<Holiday | null> {
    const holidayData = await db.oneOrNone(
      'SELECT * FROM feriados WHERE nome=$1',
      [name]
    );

    if (holidayData)
      return new Holiday(holidayData.id, holidayData.nome, holidayData.dia);

    return null;
  }

  async getAllHolidays(): Promise<Array<Holiday>> {
    const holidaysData = await db.manyOrNone(
      'SELECT * FROM feriados ORDER BY id'
    );
    const holidays: Array<Holiday> = holidaysData.map(
      (holiday) => new Holiday(holiday.id, holiday.nome, holiday.dia)
    );
    return holidays;
  }
}
