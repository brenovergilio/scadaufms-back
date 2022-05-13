import Alarm from '@src/entities/Alarm';
import BaseAlarmUseCases from './BaseAlarmUseCases';

export default class GetAllAlarmsForSpecificMeasurer extends BaseAlarmUseCases {
  async execute(measurerID: number): Promise<Array<Alarm>> {
    return this.alarmRepository.getAllAlarmsForSpecificMeasurer(measurerID);
  }
}
