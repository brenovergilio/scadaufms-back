import Alarm from '@src/entities/Alarm';
import AlarmRepository from '@src/entities/repositories/AlarmRepository';
import db from '../../database/postgres/database';

export default class AlarmRepositorySQL implements AlarmRepository {
  async deleteAlarm(id: string): Promise<Alarm> {
    const alarmData = await db.one(
      'DELETE FROM alarmes WHERE id=$1 RETURNING *',
      [id]
    );
    const alarm: Alarm = new Alarm(
      alarmData.medidor_id,
      alarmData.timestamp,
      alarmData.message,
      alarmData.id
    );
    return alarm;
  }

  async getAlarmByID(id: string): Promise<Alarm | null> {
    const alarmsData = await db.oneOrNone('SELECT * FROM alarmes WHERE id=$1', [
      id,
    ]);

    if (alarmsData)
      return new Alarm(
        alarmsData.medidor_id,
        alarmsData.timestamp,
        alarmsData.message,
        alarmsData.id
      );

    return null;
  }

  async getAllAlarmsForSpecificMeasurer(
    measurerID: string
  ): Promise<Array<Alarm>> {
    const alarmsData = await db.manyOrNone(
      'SELECT * FROM alarmes WHERE medidor_id=$1',
      [measurerID]
    );
    const alarms = alarmsData.map(
      (alarm) =>
        new Alarm(alarm.medidor_id, alarm.timestamp, alarm.message, alarm.id)
    );
    return alarms;
  }
}
