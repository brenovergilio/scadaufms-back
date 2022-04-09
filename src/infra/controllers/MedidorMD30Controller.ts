import GetAllMedidoresMD30 from '@src/usecases/MedidorMD30Related/GetAllMedidoresMD30';
import AddMedidorMD30 from '@src/usecases/MedidorMD30Related/AddMedidorMD30';
import DeleteMedidorMD30 from '@src/usecases/MedidorMD30Related/DeleteMedidorMD30';
import GetMedidorMD30ByIP from '@src/usecases/MedidorMD30Related/GetMedidorMD30ByIP';
import GetMedidorMD30ByID from '@src/usecases/MedidorMD30Related/GetMedidorMD30ByID';
import MedidorMD30Repository from '@src/usecases/repositories/MedidorMD30Repository';
import MedidorMD30 from '@src/entities/MedidorMD30';

export default class MedidorMD30Controller {
  static addMedidorMD30(
    params: any,
    body: any,
    medidorMD30Repository: MedidorMD30Repository
  ): Promise<MedidorMD30> {
    const { ip, name, port } = body;
    const addMedidorMD30UseCase = new AddMedidorMD30(
      medidorMD30Repository
    ).execute(ip.trim(), name.trim(), port);
    return addMedidorMD30UseCase;
  }

  static deleteMedidorMD30(
    params: any,
    body: any,
    medidorMD30Repository: MedidorMD30Repository
  ): Promise<MedidorMD30> {
    const { id } = params;
    const deleteMedidorMD30UseCase = new DeleteMedidorMD30(
      medidorMD30Repository
    ).execute(id);
    return deleteMedidorMD30UseCase;
  }

  static getMedidorMD30ByID(
    params: any,
    body: any,
    medidorMD30Repository: MedidorMD30Repository
  ): Promise<MedidorMD30> {
    const { id } = params;
    const getMedidorMD30ByIDUseCase = new GetMedidorMD30ByID(
      medidorMD30Repository
    ).execute(id);
    return getMedidorMD30ByIDUseCase;
  }

  static getMedidorMD30ByIP(
    params: any,
    body: any,
    medidorMD30Repository: MedidorMD30Repository
  ): Promise<MedidorMD30> {
    const { ip } = params;
    const getMedidorMD30ByIPUseCase = new GetMedidorMD30ByIP(
      medidorMD30Repository
    ).execute(ip.trim());
    return getMedidorMD30ByIPUseCase;
  }

  static getAllMedidoresMD30(
    params: any,
    body: any,
    medidorMD30Repository: MedidorMD30Repository
  ): Promise<Array<MedidorMD30>> {
    const getAllMedidoresMD30UseCase = new GetAllMedidoresMD30(
      medidorMD30Repository
    ).execute();
    return getAllMedidoresMD30UseCase;
  }
}
