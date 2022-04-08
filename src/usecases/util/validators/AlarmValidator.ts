import Alarm from "@src/entities/Alarm";
import AlarmRepository from "@src/usecases/repositories/AlarmRepository";

export async function existsByID(id: number, alarmRepository: AlarmRepository): Promise<boolean> {
  const alarm: Alarm = await alarmRepository.getAlarmByID(id);
  return alarm ? true : false;
}