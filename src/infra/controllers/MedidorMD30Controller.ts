import ListAllMedidoresMD30 from "@src/usecases/MedidorMD30Related/ListAllMedidoresMD30";
import AddMedidorMD30 from "@src/usecases/MedidorMD30Related/AddMedidorMD30";
import DeleteMedidorMD30 from "@src/usecases/MedidorMD30Related/DeleteMedidorMD30";
import GetMedidorMD30ByIP from "@src/usecases/MedidorMD30Related/GetMedidorMD30ByIP";
import MedidorMD30Repository from "@src/usecases/repositories/MedidorMD30Repository";
import MedidorMD30 from "@src/entities/MedidorMD30";

export default class MedidorMD30Controller {
  
  static addMedidorMD30(params: any, body: any, medidorMD30Repository: MedidorMD30Repository): void {
    const { ip, name, port } = body;
    const addMedidorMD30UseCase = new AddMedidorMD30(medidorMD30Repository).execute(ip, name, port);
  }

  static deleteMedidorMD30(params: any, body: any, medidorMD30Repository: MedidorMD30Repository): void {
    const { ip } = params;
    const deleteMedidorMD30UseCase = new DeleteMedidorMD30(medidorMD30Repository).execute(ip);
  }

  static getMedidorMD30ByIP(params: any, body: any, medidorMD30Repository: MedidorMD30Repository): Promise<MedidorMD30> {
    const { ip } = params;
    const getMedidorMD30ByIPUseCase = new GetMedidorMD30ByIP(medidorMD30Repository).execute(ip);
    return getMedidorMD30ByIPUseCase;
  }

  static listAllMedidoresMD30(params: any, body: any, medidorMD30Repository: MedidorMD30Repository): Promise<Array<MedidorMD30>> {
    const listAllMedidoresMD30UseCase = new ListAllMedidoresMD30(medidorMD30Repository).execute();
    return listAllMedidoresMD30UseCase;
  }
}