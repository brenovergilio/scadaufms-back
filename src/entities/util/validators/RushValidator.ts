import Rush from "../../interfaces/Rush";

export function isValidRush(rush: Rush): boolean {
  return isValidHour(rush.hour) && isValidMinute(rush.minute) && isValidInterval(rush.interval);
}

function isValidHour(hour: number): boolean {
  return hour >=0 && hour <= 23;
}

function isValidMinute(minute: number): boolean {
  return minute >=0 && minute <= 59;
}

function isValidInterval(interval: number): boolean {
  return interval >=0 && interval <= 23;
}