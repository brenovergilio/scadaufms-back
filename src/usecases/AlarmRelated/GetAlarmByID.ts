import Alarm from '@src/entities/Alarm';
import NotFoundError from '../util/errors/NotFoundError';
import BaseAlarmUseCases from './BaseAlarmUseCases';

export default class GetAlarmByID extends BaseAlarmUseCases {
  async execute(id: string): Promise<Alarm> {
    const alarm = await this.alarmRepository.getAlarmByID(id);

    if (!alarm) throw new NotFoundError();

    return alarm;
  }
}
