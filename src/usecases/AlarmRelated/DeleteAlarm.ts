import AlarmRepository from "../repositories/AlarmRepository";
import NotFoundError from "../util/errors/NotFoundError";
import { existsByID } from "../util/validators/AlarmValidator";

export default class DeleteAlarm {
  alarmRepository: AlarmRepository;

  constructor(alarmRepository: AlarmRepository) {
    this.alarmRepository = alarmRepository;
  }

  async execute(id: number): Promise<void> {
    const alarmExists: boolean = await existsByID(id, this.alarmRepository);

    if(!alarmExists) 
      throw new NotFoundError();

    this.alarmRepository.deleteAlarm(id);
  }
}