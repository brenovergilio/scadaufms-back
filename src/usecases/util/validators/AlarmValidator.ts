import AlarmRepository from '@src/entities/repositories/AlarmRepository';

export async function existsByID(
  id: string,
  alarmRepository: AlarmRepository
): Promise<boolean> {
  const alarm = await alarmRepository.getAlarmByID(id);
  return alarm ? true : false;
}
