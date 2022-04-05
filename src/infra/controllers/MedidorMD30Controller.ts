import ListAllMedidoresMD30 from "@src/usecases/MedidorMD30Related/ListAllMedidoresMD30";
import AddMedidorMD30 from "@src/usecases/MedidorMD30Related/AddMedidorMD30";
import MedidorMD30Repository from "@src/usecases/repositories/MedidorMD30Repository";

export default class MedidorMD30Controller {
  
  static addMedidorMD30(params: any, body: any, repository: MedidorMD30Repository): void {
    const { ip, name, port } = body;
    const addMedidorMD30UseCase = new AddMedidorMD30(repository).execute(ip, name, port);
  }

  static listAllMedidoresMD30(params: any, body: any, repository: MedidorMD30Repository) {
    const listAllMedidoresMD30UseCase = new ListAllMedidoresMD30(repository).execute();
    return listAllMedidoresMD30UseCase;
  }
}