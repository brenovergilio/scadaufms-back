import Holiday from '@src/entities/Holiday';
import db from '@src/external/database/postgres/database';
import HolidayAdapter from '@src/infra/adapters/HolidayAdapter';
import HolidayRepository from '@src/usecases/repositories/HolidayRepository';

export default class HolidayRepositorySQL implements HolidayRepository {
  async addHoliday(name: string, day: Date): Promise<Holiday> {
    const holidayData = await db.one(
      'INSERT INTO feriados (nome, dia) VALUES ($1, $2) RETURNING *',
      [name, day]
    );
    const holiday: Holiday = HolidayAdapter.create(
      holidayData.id,
      holidayData.nome,
      holidayData.dia
    );
    return holiday;
  }

  async deleteHoliday(id: number): Promise<Holiday> {
    const holidayData = await db.one(
      'DELETE FROM feriados WHERE id=$1 RETURNING *',
      [id]
    );
    const holiday: Holiday = HolidayAdapter.create(
      holidayData.id,
      holidayData.nome,
      holidayData.dia
    );
    return holiday;
  }

  async getHolidayByID(id: number): Promise<Holiday | null> {
    const holidayData = await db.oneOrNone(
      'SELECT * FROM feriados WHERE id=$1',
      [id]
    );

    if (holidayData)
      return HolidayAdapter.create(
        holidayData.id,
        holidayData.nome,
        holidayData.dia
      );

    return null;
  }

  async getHolidayByName(name: string): Promise<Holiday | null> {
    const holidayData = await db.oneOrNone(
      'SELECT * FROM feriados WHERE nome=$1',
      [name]
    );

    if (holidayData)
      return HolidayAdapter.create(
        holidayData.id,
        holidayData.nome,
        holidayData.dia
      );

    return null;
  }

  async getAllHolidays(): Promise<Array<Holiday>> {
    const holidaysData = await db.manyOrNone(
      'SELECT * FROM feriados ORDER BY id'
    );
    const holidays: Array<Holiday> = holidaysData.map((holiday) =>
      HolidayAdapter.create(holiday.id, holiday.nome, holiday.dia)
    );
    return holidays;
  }
}
