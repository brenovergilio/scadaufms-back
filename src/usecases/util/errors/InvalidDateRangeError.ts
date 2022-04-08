export default class InvalidDateRangeError extends Error{
  constructor() {
    super("Data final menor que a inicial");
  }
}