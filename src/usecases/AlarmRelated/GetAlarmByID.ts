import Alarm from "@src/entities/Alarm";
import AlarmRepository from "../repositories/AlarmRepository";
import NotFoundError from "../util/errors/NotFoundError";

export default class GetAlarmByID {
  alarmRepository: AlarmRepository;

  constructor(alarmRepository: AlarmRepository) {
    this.alarmRepository = alarmRepository;
  }

  async execute(id: number): Promise<Alarm> {
    const alarm = await this.alarmRepository.getAlarmByID(id);

    if(!alarm)
      throw new NotFoundError();

    return alarm;
  }
}