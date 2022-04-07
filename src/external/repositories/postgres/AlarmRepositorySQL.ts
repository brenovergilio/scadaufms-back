import Alarm from "@src/entities/Alarm";
import AlarmsAdapter from "@src/infra/adapters/AlarmAdapter";
import AlarmRepository from "@src/usecases/repositories/AlarmRepository";
import db from "../../database/postgres/database";

export default class AlarmRepositorySQL implements AlarmRepository {
  deleteAlarm(id: number): void {
    throw new Error("Method not implemented.");
  }
  async getAllAlarmsForSpecificMeasurer(measurerIP: string): Promise<Array<Alarm>> {
    const alarmsData = await db.manyOrNone("SELECT * FROM alarmes WHERE medidor_ip=$1", [measurerIP]);
    const alarms = alarmsData.map((alarm) => AlarmsAdapter.create(alarm.medidor_ip, alarm.timestamp, alarm.message));
    return alarms;
  }
}