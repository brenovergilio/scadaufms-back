export enum DayOfWeek {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}

export function datesMatch(firstDate: Date, secondDate: Date): boolean {
  return (
    firstDate.getUTCFullYear() === secondDate.getUTCFullYear() &&
    firstDate.getUTCMonth() === secondDate.getUTCMonth() &&
    firstDate.getUTCDate() === secondDate.getUTCDate()
  );
}

export function convertBrazilianDateStringToDate(
  brazilianDateString: string
): Date {
  const [completeDay, completeHour] = brazilianDateString.split(' ');
  const [day, month, year] = completeDay.split('/');
  const [hour, minute, second] = completeHour.split(':');
  return new Date(
    Date.UTC(
      Number.parseInt(year),
      Number.parseInt(month) - 1,
      Number.parseInt(day),
      Number.parseInt(hour),
      Number.parseInt(minute),
      Number.parseInt(second)
    )
  );
}
