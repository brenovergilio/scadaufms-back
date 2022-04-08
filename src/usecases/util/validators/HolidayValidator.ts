import Holiday from "@src/entities/Holiday";
import HolidayRepository from "@src/usecases/repositories/HolidayRepository";

export async function duplicatedName(name: string, holidayRepository: HolidayRepository): Promise<boolean> {
  const holiday: Holiday = await holidayRepository.getHolidayByName(name);
  return holiday ? true : false;
}

export async function existsByID(id: number, holidayRepository: HolidayRepository): Promise<boolean> {
  const holiday: Holiday = await holidayRepository.getHolidayByID(id);
  return holiday ? true : false;
}