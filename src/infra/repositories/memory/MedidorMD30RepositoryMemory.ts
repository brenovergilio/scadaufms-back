import MedidorMD30 from "@src/entities/MedidorMD30";
import MedidorMD30Adapter from "@src/infra/adapters/MedidorMD30Adapter";
import MedidorMD30Repository from "@src/usecases/repositories/MedidorMD30Repository";

export default class MedidorMD30RepositoryMemory implements MedidorMD30Repository {
  
  medidoresMD30Database = [
    {
      ip: '200.129.210.97',
      created_at: '2022-03-24 19:19:44.146833',
      nome: 'Reitoria',
      porta: 1001,
      hora_fora_ponta: 17,
      minuto_fora_ponta: 30,
      intervalo_fora_ponta: 3,
    }
  ]
  
  getMedidorMD30ByIP(ip: string): Promise<MedidorMD30> {
      const medidorMD30DatabaseData = this.medidoresMD30Database.find(value => value.ip === ip);
      if(medidorMD30DatabaseData === undefined) {
        throw Error('MedidorMD30 não cadastrado');
      }
      const medidorMD30: MedidorMD30 = MedidorMD30Adapter.create(medidorMD30DatabaseData.ip, medidorMD30DatabaseData.nome, medidorMD30DatabaseData.porta, medidorMD30DatabaseData.hora_fora_ponta, medidorMD30DatabaseData.minuto_fora_ponta, medidorMD30DatabaseData.intervalo_fora_ponta); 
      return Promise.resolve(medidorMD30);
  }

  getAllMedidoresMD30(): Promise<Array<MedidorMD30>> {
    const medidoresMD30DatabaseData = this.medidoresMD30Database;
    const medidoresMD30: Array<MedidorMD30> = medidoresMD30DatabaseData.map(value => {
      return MedidorMD30Adapter.create(value.ip, value.nome, value.porta, value.hora_fora_ponta, value.minuto_fora_ponta, value.intervalo_fora_ponta)}
      );
    return Promise.resolve(medidoresMD30);
  }
}