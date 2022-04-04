import Alarm from "@src/entities/Alarm";
import AlarmRepository from "./repositories/AlarmRepository";

export default class AddAlarm {
  alarmRepository: AlarmRepository;

  constructor(alarmRepository: AlarmRepository) {
    this.alarmRepository = alarmRepository;
  }

  execute(measurerIP: string, timestamp: Date, message: string): void {
    const alarm: Alarm = new Alarm(measurerIP, timestamp, message);
    
    if (alarm)
      this.alarmRepository.addAlarm(alarm.measurerIP, alarm.timestamp, alarm.message); 
  }
}