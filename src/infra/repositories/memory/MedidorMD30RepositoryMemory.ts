import MedidorMD30 from "@src/entities/medidor-md30";
import MedidorMD30Repository from "@src/usecases/repositories/MedidorMD30Repository";

export default class MedidorMD30RepositoryMemory implements MedidorMD30Repository {
  
  medidoresMD30Database = [

  ]
  
  getAllMedidoresMD30(): Promise<Array<MedidorMD30>> {
    const medidoresMD30DatabaseData = this.medidoresMD30Database;
    const medidoresMD30 = 
    return Promise.resolve(this.medidoresMD30);
  }
}