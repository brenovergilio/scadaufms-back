import DateRange from '../DateRange';

export default function isValidDateRange(dateRange: DateRange): boolean {
  return dateRange.finalDate >= dateRange.initialDate;
}
