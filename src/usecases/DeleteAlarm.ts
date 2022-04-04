import AlarmRepository from "./repositories/AlarmRepository";

export default class DeleteAlarm {
  alarmRepository: AlarmRepository;

  constructor(alarmRepository: AlarmRepository) {
    this.alarmRepository = alarmRepository;
  }

  execute(id: number): void {
    this.alarmRepository.deleteAlarm(id);
  }
}