import Holiday from "../Holiday";
import Measurement from "../interfaces/Measurement";
import Rush from "../interfaces/Rush";

export function measurementAcumulator(measurement: Measurement): number {
  let acumulator = 0;
  measurement.values.forEach((value) => acumulator += value);
  return acumulator;
}

enum DayOfWeek {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6
}

export function isInsideRushHour(measurement: Measurement, rush: Rush, holidays: Array<Holiday>): boolean {
  if(typeof measurement.timestamp === 'string') measurement.timestamp = new Date(measurement.timestamp);

  const dayOfWeek = measurement.timestamp.getUTCDay();

  if(dayOfWeek === DayOfWeek.SATURDAY || dayOfWeek === DayOfWeek.SUNDAY) return false;

  for(let holiday of holidays) if(datesMatch(holiday.day, measurement.timestamp as Date)) return false;

  const finalHour = rush.hour + rush.interval;
  const measurementHour = measurement.timestamp.getUTCHours();
  const measurementMinute = measurement.timestamp.getUTCMinutes();

  if(measurementHour < rush.hour || measurementHour > finalHour) return false;

  if((measurementHour === rush.hour && measurementMinute < rush.minute) || (measurementHour === finalHour && measurementMinute >= rush.minute)) return false;

  return true;
}

export function datesMatch(firstDate: Date, secondDate: Date): boolean {
  return (firstDate.getUTCFullYear() === secondDate.getUTCFullYear()) && (firstDate.getUTCMonth() === secondDate.getUTCDate()) && (firstDate.getUTCDate() === secondDate.getUTCDate());  
}