import GetAllMedidoresMD30 from '@src/usecases/MedidorMD30Related/GetAllMedidoresMD30';
import AddMedidorMD30 from '@src/usecases/MedidorMD30Related/AddMedidorMD30';
import DeleteMedidorMD30 from '@src/usecases/MedidorMD30Related/DeleteMedidorMD30';
import GetMedidorMD30ByIP from '@src/usecases/MedidorMD30Related/GetMedidorMD30ByIP';
import GetMedidorMD30ByID from '@src/usecases/MedidorMD30Related/GetMedidorMD30ByID';
import MedidorMD30Repository from '@src/entities/repositories/MedidorMD30Repository';
import MedidorMD30 from '@src/entities/MedidorMD30';
import MeasurerChecker from '@src/entities/interfaces/MeasurerChecker';
import BaseController from './BaseController';
import {
  InputAddMedidorMD30,
  InputDeleteMedidorMD30,
  InputUpdateSpecificMedidorMD30,
} from '@src/usecases/MedidorMD30Related/Inputs';
import UserRepository from '@src/entities/repositories/UserRepository';
import UpdateSpecificMedidorMD30 from '@src/usecases/MedidorMD30Related/UpdateSpecificMedidorMD30';

export default class MedidorMD30Controller extends BaseController {
  static async addMedidorMD30(
    params: any,
    body: any,
    query: any,
    headers: any,
    medidorMD30Repository: MedidorMD30Repository,
    userRepository: UserRepository,
    measurerChecker: MeasurerChecker
  ): Promise<MedidorMD30> {
    const { ip, name, port } = body;
    const token = headers.authorization.split(' ')[1];
    const sourceUserID = BaseController.decodeIDFromToken(token);
    const input: InputAddMedidorMD30 = new InputAddMedidorMD30(
      sourceUserID,
      ip,
      name,
      port,
      measurerChecker
    );

    await BaseController.validateInput(input);

    const addMedidorMD30UseCase = new AddMedidorMD30(
      medidorMD30Repository,
      userRepository
    ).execute(input);
    return addMedidorMD30UseCase;
  }

  static async deleteMedidorMD30(
    params: any,
    body: any,
    query: any,
    headers: any,
    medidorMD30Repository: MedidorMD30Repository,
    userRepository: UserRepository
  ): Promise<MedidorMD30> {
    const { id } = params;
    const token = headers.authorization.split(' ')[1];
    const sourceUserID = BaseController.decodeIDFromToken(token);

    const input: InputDeleteMedidorMD30 = new InputDeleteMedidorMD30(
      sourceUserID,
      id
    );

    await BaseController.validateInput(input);

    const deleteMedidorMD30UseCase = new DeleteMedidorMD30(
      medidorMD30Repository,
      userRepository
    ).execute(input);
    return deleteMedidorMD30UseCase;
  }

  static getMedidorMD30ByID(
    params: any,
    body: any,
    query: any,
    headers: any,
    medidorMD30Repository: MedidorMD30Repository,
    userRepository: UserRepository
  ): Promise<MedidorMD30> {
    const { id } = params;
    const getMedidorMD30ByIDUseCase = new GetMedidorMD30ByID(
      medidorMD30Repository,
      userRepository
    ).execute(id);
    return getMedidorMD30ByIDUseCase;
  }

  static getMedidorMD30ByIP(
    params: any,
    body: any,
    query: any,
    headers: any,
    medidorMD30Repository: MedidorMD30Repository,
    userRepository: UserRepository
  ): Promise<MedidorMD30> {
    const { ip } = params;
    const getMedidorMD30ByIPUseCase = new GetMedidorMD30ByIP(
      medidorMD30Repository,
      userRepository
    ).execute(ip);
    return getMedidorMD30ByIPUseCase;
  }

  static getAllMedidoresMD30(
    params: any,
    body: any,
    query: any,
    headers: any,
    medidorMD30Repository: MedidorMD30Repository,
    userRepository: UserRepository
  ): Promise<Array<MedidorMD30>> {
    const getAllMedidoresMD30UseCase = new GetAllMedidoresMD30(
      medidorMD30Repository,
      userRepository
    ).execute();
    return getAllMedidoresMD30UseCase;
  }

  static async updateMedidorMD30(
    params: any,
    body: any,
    query: any,
    headers: any,
    medidorMD30Repository: MedidorMD30Repository,
    userRepository: UserRepository
  ): Promise<MedidorMD30> {
    const { measurerID } = params;
    const { ip, name, port, rushHour, rushMinute, rushInterval } = body;
    const token = headers.authorization.split(' ')[1];
    const sourceUserID = BaseController.decodeIDFromToken(token);
    const input: InputUpdateSpecificMedidorMD30 = new InputUpdateSpecificMedidorMD30(
      sourceUserID,
      measurerID,
      ip,
      name,
      port,
      rushHour,
      rushMinute,
      rushInterval
    );

    await BaseController.validateInput(input);

    const updateMedidorMD30 = new UpdateSpecificMedidorMD30(
      medidorMD30Repository,
      userRepository
    ).execute(input);
    return updateMedidorMD30;
  }
}
