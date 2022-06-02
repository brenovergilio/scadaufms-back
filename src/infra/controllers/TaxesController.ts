import TaxesRepository from '@src/entities/repositories/TaxesRepository';
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
    taxesRepository: TaxesRepository
  ): Promise<Array<Taxes>> {
    const getAllTaxesUseCase = new GetAllTaxesUseCase(
      taxesRepository
    ).execute();
    return getAllTaxesUseCase;
  }

  static async getSpecificTax(
    params: any,
    body: any,
    query: any,
    headers: any,
    taxesRepository: TaxesRepository
  ): Promise<Taxes> {
    const { type } = params;
    const input: GetSpecificTaxInput = new GetSpecificTaxInput(
      Number.parseInt(type)
    );

    await BaseController.validateInput(input);

    const getSpecificTaxUseCase = new GetSpecificTaxUseCase(
      taxesRepository
    ).execute(input);
    return getSpecificTaxUseCase;
  }

  static async updateSpecificTax(
    params: any,
    body: any,
    query: any,
    headers: any,
    taxesRepository: TaxesRepository
  ): Promise<Taxes> {
    const { type } = params;
    const {
      demandaPonta,
      demandaForaPonta,
      demandaUnica,
      consumoPonta,
      consumoForaPonta,
    } = body;

    const input: UpdateSpecificTaxInput = new UpdateSpecificTaxInput(
      Number.parseInt(type),
     demandaPonta,
     demandaForaPonta,
     demandaUnica,
     consumoPonta,
     consumoForaPonta
    );

    await BaseController.validateInput(input);

    const updateSpecificTax = new UpdateSpecificTaxUseCase(
      taxesRepository
    ).execute(input);
    return updateSpecificTax;
  }
}
