import Alarm from "@src/entities/Alarm";
import AlarmRepository from "../repositories/AlarmRepository";

export default class GetAllAlarmsForSpecificMeasurer {
  alarmRepository: AlarmRepository;

  constructor(alarmRepository: AlarmRepository) {
    this.alarmRepository = alarmRepository;
  }

  async execute(measurerIP: string): Promise<Array<Alarm>> {
    return this.alarmRepository.getAllAlarmsForSpecificMeasurer(measurerIP); 
  }
}