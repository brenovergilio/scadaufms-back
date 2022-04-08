import MedicaoMD30 from "@src/entities/MedicaoMD30";
import GetTensoesPerDateRange from "@src/usecases/MedicaoMD30Related/GetTensoesPerDateRange";
import GetCorrentesPerDateRange from "@src/usecases/MedicaoMD30Related/GetCorrentesPerDateRange";
import GetPotenciasAtivasPerDateRange from "@src/usecases/MedicaoMD30Related/GetPotenciasAtivasPerDateRange";
import GetPotenciasReativasPerDateRange from "@src/usecases/MedicaoMD30Related/GetPotenciasReativasPerDateRange";
import GetPotenciasAparentesPerDateRange from "@src/usecases/MedicaoMD30Related/GetPotenciasAparentesPerDateRange";
import GetFatoresDePotenciaPerDateRange from "@src/usecases/MedicaoMD30Related/GetFatoresDePotenciaPerDateRange";
import MedicaoMD30Repository from "@src/usecases/repositories/MedicaoMD30Repository";

export default class MedicaoMD30Controller {
  
  static getTensoesPerDateRange(params: any, body: any, medicaoMD30Repository: MedicaoMD30Repository): Promise<Array<MedicaoMD30>> {
    const { measurerID } = params;
    const getTensoesPerDateRangeUseCase = new GetTensoesPerDateRange(medicaoMD30Repository).execute(measurerID);
    return getTensoesPerDateRangeUseCase;
  }

  static getCorrentesPerDateRange(params: any, body: any, medicaoMD30Repository: MedicaoMD30Repository): Promise<Array<MedicaoMD30>> {
    const { measurerID } = params;
    const getCorrentesPerDateRangeUseCase = new GetCorrentesPerDateRange(medicaoMD30Repository).execute(measurerID);
    return getCorrentesPerDateRangeUseCase;
  }

  static getPotenciasAtivasPerDateRange(params: any, body: any, medicaoMD30Repository: MedicaoMD30Repository): Promise<Array<MedicaoMD30>> {
    const { measurerID } = params;
    const getPotenciasAtivasPerDateRangeUseCase = new GetPotenciasAtivasPerDateRange(medicaoMD30Repository).execute(measurerID);
    return getPotenciasAtivasPerDateRangeUseCase;
  }

  static getPotenciasReativasPerDateRange(params: any, body: any, medicaoMD30Repository: MedicaoMD30Repository): Promise<Array<MedicaoMD30>> {
    const { measurerID } = params;
    const getPotenciasReativasPerDateRangeUseCase = new GetPotenciasReativasPerDateRange(medicaoMD30Repository).execute(measurerID);
    return getPotenciasReativasPerDateRangeUseCase;
  }

  static getPotenciasAparentesPerDateRange(params: any, body: any, medicaoMD30Repository: MedicaoMD30Repository): Promise<Array<MedicaoMD30>> {
    const { measurerID } = params;
    const getPotenciasAparentesPerDateRangeUseCase = new GetPotenciasAparentesPerDateRange(medicaoMD30Repository).execute(measurerID);
    return getPotenciasAparentesPerDateRangeUseCase;
  }

  static getFatoresDePotenciaPerDateRange(params: any, body: any, medicaoMD30Repository: MedicaoMD30Repository): Promise<Array<MedicaoMD30>> {
    const { measurerID } = params;
    const getFatoresDePotenciaPerDateRangeUseCase = new GetFatoresDePotenciaPerDateRange(medicaoMD30Repository).execute(measurerID);
    return getFatoresDePotenciaPerDateRangeUseCase;
  }
}