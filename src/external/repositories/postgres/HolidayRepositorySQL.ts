import Holiday from "@src/entities/Holiday";
import db from "@src/external/database/postgres/database";
import HolidayAdapter from "@src/infra/adapters/HolidayAdapter";
import HolidayRepository from "@src/usecases/repositories/HolidayRepository";

export default class HolidayRepositorySQL implements HolidayRepository {
  async addHoliday(name: string, day: Date): Promise<void> {
    await db.none("INSERT INTO feriados (nome, dia) VALUES ($1, $2)", [name, day]);
  }

  async deleteHoliday(id: number): Promise<void> {
    await db.none("DELETE FROM feriados WHERE id=$1", [id]);
  }

  async getHolidayByID(id: number): Promise<Holiday> {
    const holidayData = await db.oneOrNone("SELECT * FROM feriados WHERE id=$1", [id]);
    const holiday: Holiday = HolidayAdapter.create(holidayData.id, holidayData.nome, holidayData.dia);
    return holiday;
  }

  async getHolidayByName(name: string): Promise<Holiday> {
    const holidayData = await db.oneOrNone("SELECT * FROM feriados WHERE nome=$1", [name]);
    const holiday: Holiday = HolidayAdapter.create(holidayData.id, holidayData.nome, holidayData.dia);
    return holiday;
  }

  async getAllHolidays(): Promise<Array<Holiday>> {
    const holidaysData = await db.manyOrNone("SELECT * FROM feriados ORDER BY dia");
    const holidays: Array<Holiday> = holidaysData.map((holiday) => HolidayAdapter.create(holiday.id, holiday.nome, holiday.dia));
    return holidays;
  }
}