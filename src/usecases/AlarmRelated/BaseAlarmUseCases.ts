import AlarmRepository from '@src/entities/repositories/AlarmRepository';
import UserRepository from '@src/entities/repositories/UserRepository';

export default class DeleteAlarm {
  alarmRepository: AlarmRepository;
  userRepository: UserRepository;

  constructor(
    alarmRepository: AlarmRepository,
    userRepository: UserRepository
  ) {
    this.alarmRepository = alarmRepository;
    this.userRepository = userRepository;
  }
}
