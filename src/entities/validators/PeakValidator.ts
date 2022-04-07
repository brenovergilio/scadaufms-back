import Peak from "../interfaces/Peak";

export function isValidPeak(peak: Peak): boolean {
  return isValidHour(peak.hour) && isValidMinute(peak.minute) && isValidInterval(peak.interval);
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