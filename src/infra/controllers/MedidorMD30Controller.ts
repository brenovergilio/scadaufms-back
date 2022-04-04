import MedidorMD30RepositorySQL from "@src/external/repositories/MedidorMD30RepositorySQL";
import ListAllMedidoresMD30 from "@src/usecases/ListAllMedidoresMD30";

export default class MedidorMD30Controller {

  static listAllMedidoresMD30() {
    const medidorMD30RepositorySQL: MedidorMD30RepositorySQL = new MedidorMD30RepositorySQL();
    const listAllMedidoresMD30UseCase = new ListAllMedidoresMD30(medidorMD30RepositorySQL);
    return listAllMedidoresMD30UseCase;
  }
}