import { v4 } from 'uuid';

export default class Holiday {
  constructor(public name: string, public day: Date, public id: string = v4()) {

  }

  // Workaround to get rid of time on javascript Date object
  private setTimeToMin(date: Date) {
    const newDate: Date = new Date(Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate()
    )
    );
    return new Date(newDate.setUTCHours(0, 0, 0, 0));
  }
}
