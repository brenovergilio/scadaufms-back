import Alarm from '@src/entities/Alarm';
import AlarmRepository from '../repositories/AlarmRepository';
import NotFoundError from '../util/errors/NotFoundError';
import { existsByID } from '../util/validators/AlarmValidator';

export default class DeleteAlarm {
  alarmRepository: AlarmRepository;

  constructor(alarmRepository: AlarmRepository) {
    this.alarmRepository = alarmRepository;
  }

  async execute(id: number): Promise<Alarm> {
    const alarmExists: boolean = await existsByID(id, this.alarmRepository);

    if (!alarmExists) throw new NotFoundError();

    return await this.alarmRepository.deleteAlarm(id);
  }
}
