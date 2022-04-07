import Holiday from "@src/entities/Holiday";

export default class HolidayAdapter {
  static create(id: number, name: string, day: Date) {
    const holiday: Holiday = new Holiday(id, name, day);
    return holiday;
  }
}