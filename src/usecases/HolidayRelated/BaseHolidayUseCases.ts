import UserRepository from '@src/entities/repositories/UserRepository';
import HolidayRepository from '../../entities/repositories/HolidayRepository';

export default class BaseHolidayUseCases {
  holidayRepository: HolidayRepository;
  userRepository: UserRepository;

  constructor(
    holidayRepository: HolidayRepository,
    userRepository: UserRepository
  ) {
    this.holidayRepository = holidayRepository;
    this.userRepository = userRepository;
  }
}
