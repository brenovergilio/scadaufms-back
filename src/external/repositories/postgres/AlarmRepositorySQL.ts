import Alarm from "@src/entities/Alarm";
import AlarmsAdapter from "@src/infra/adapters/AlarmAdapter";
import AlarmRepository from "@src/usecases/repositories/AlarmRepository";
import db from "../../database/postgres/database";

export default class AlarmRepositorySQL implements AlarmRepository {
  async deleteAlarm(id: number): Promise<void> {
    await db.none("DELETE FROM alarmes WHERE id=$1", [id]);
  }

  async getAllAlarmsForSpecificMeasurer(measurerID: number): Promise<Array<Alarm>> {
    const alarmsData = await db.manyOrNone("SELECT * FROM alarmes WHERE medidor_id=$1", [measurerID]);
    const alarms = alarmsData.map((alarm) => AlarmsAdapter.create(alarm.id, alarm.medidor_id, alarm.timestamp, alarm.message));
    return alarms;
  }
}