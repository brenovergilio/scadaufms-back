import TaxesRepository from '@src/entities/repositories/TaxesRepository';
import UserRepository from '@src/entities/repositories/UserRepository';
import Taxes from '@src/entities/Taxes';
import GetAllTaxesUseCase from '@src/usecases/TaxesRelated/GetAllTaxesUseCase';
import GetSpecificTaxUseCase from '@src/usecases/TaxesRelated/GetSpecificTaxUseCase';
import {
  GetSpecificTaxInput,
  UpdateSpecificTaxInput,
} from '@src/usecases/TaxesRelated/Inputs';
import UpdateSpecificTaxUseCase from '@src/usecases/TaxesRelated/UpdateSpecificTaxUseCase';
import BaseController from './BaseController';

export default class TaxesController extends BaseController {
  static getAllTaxes(
    params: any,
    body: any,
    query: any,
    headers: any,
    taxesRepository: TaxesRepository,
    userRepository: UserRepository
  ): Promise<Array<Taxes>> {
    const getAllTaxesUseCase = new GetAllTaxesUseCase(
      taxesRepository,
      userRepository
    ).execute();
    return getAllTaxesUseCase;
  }

  static async getSpecificTax(
    params: any,
    body: any,
    query: any,
    headers: any,
    taxesRepository: TaxesRepository,
    userRepository: UserRepository
  ): Promise<Taxes> {
    const { type } = params;
    const input: GetSpecificTaxInput = new GetSpecificTaxInput(
      Number.parseInt(type)
    );

    await BaseController.validateInput(input);

    const getSpecificTaxUseCase = new GetSpecificTaxUseCase(
      taxesRepository,
      userRepository
    ).execute(input);
    return getSpecificTaxUseCase;
  }

  static async updateSpecificTax(
    params: any,
    body: any,
    query: any,
    headers: any,
    taxesRepository: TaxesRepository,
    userRepository: UserRepository
  ): Promise<Taxes> {
    const { type } = params;
    const {
      demandaPonta,
      demandaForaPonta,
      demandaUnica,
      consumoPonta,
      consumoForaPonta,
    } = body;
    const token = headers.authorization.split(' ')[1];
    const sourceUserID = BaseController.decodeIDFromToken(token);

    const input: UpdateSpecificTaxInput = new UpdateSpecificTaxInput(
      Number.parseInt(type),
      sourceUserID,
      demandaPonta,
      demandaForaPonta,
      demandaUnica,
      consumoPonta,
      consumoForaPonta
    );

    await BaseController.validateInput(input);

    const updateSpecificTax = new UpdateSpecificTaxUseCase(
      taxesRepository,
      userRepository
    ).execute(input);
    return updateSpecificTax;
  }
}
