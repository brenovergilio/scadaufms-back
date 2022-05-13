import Alarm from '@src/entities/Alarm';
import NotFoundError from '../util/errors/NotFoundError';
import { existsByID } from '../util/validators/AlarmValidator';
import { validateAuthenticatedAdmin } from '../util/validators/UserValidator';
import BaseAlarmUseCases from './BaseAlarmUseCases';
import { InputDeleteAlarm } from './Inputs';

export default class DeleteAlarm extends BaseAlarmUseCases {
  async execute(input: InputDeleteAlarm): Promise<Alarm> {
    await validateAuthenticatedAdmin(input.sourceUserID, this.userRepository);

    const alarmExists: boolean = await existsByID(
      input.alarmID,
      this.alarmRepository
    );

    if (!alarmExists) throw new NotFoundError();

    return await this.alarmRepository.deleteAlarm(input.alarmID);
  }
}
