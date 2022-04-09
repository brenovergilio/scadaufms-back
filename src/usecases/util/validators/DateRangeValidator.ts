export default function isValidDateRange(
  initialDate: Date,
  finalDate: Date
): boolean {
  return finalDate >= initialDate;
}
