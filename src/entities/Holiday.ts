export default class Holiday {
  id: number;
  name: string;
  day: Date;

  constructor(id: number, name: string, day:Date) {
    this.id = id;
    this.name = name;
    this.day = day;
  }
}