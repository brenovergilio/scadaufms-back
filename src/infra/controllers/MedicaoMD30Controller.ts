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
    const { measurerIP } = params;
    const getTensoesPerDateRangeUseCase = new GetTensoesPerDateRange(medicaoMD30Repository).execute(measurerIP);
    return getTensoesPerDateRangeUseCase;
  }

  static getCorrentesPerDateRange(params: any, body: any, medicaoMD30Repository: MedicaoMD30Repository): Promise<Array<MedicaoMD30>> {
    const { measurerIP } = params;
    const getCorrentesPerDateRangeUseCase = new GetCorrentesPerDateRange(medicaoMD30Repository).execute(measurerIP);
    return getCorrentesPerDateRangeUseCase;
  }

  static getPotenciasAtivasPerDateRange(params: any, body: any, medicaoMD30Repository: MedicaoMD30Repository): Promise<Array<MedicaoMD30>> {
    const { measurerIP } = params;
    const getPotenciasAtivasPerDateRangeUseCase = new GetPotenciasAtivasPerDateRange(medicaoMD30Repository).execute(measurerIP);
    return getPotenciasAtivasPerDateRangeUseCase;
  }

  static getPotenciasReativasPerDateRange(params: any, body: any, medicaoMD30Repository: MedicaoMD30Repository): Promise<Array<MedicaoMD30>> {
    const { measurerIP } = params;
    const getPotenciasReativasPerDateRangeUseCase = new GetPotenciasReativasPerDateRange(medicaoMD30Repository).execute(measurerIP);
    return getPotenciasReativasPerDateRangeUseCase;
  }

  static getPotenciasAparentesPerDateRange(params: any, body: any, medicaoMD30Repository: MedicaoMD30Repository): Promise<Array<MedicaoMD30>> {
    const { measurerIP } = params;
    const getPotenciasAparentesPerDateRangeUseCase = new GetPotenciasAparentesPerDateRange(medicaoMD30Repository).execute(measurerIP);
    return getPotenciasAparentesPerDateRangeUseCase;
  }

  static getFatoresDePotenciaPerDateRange(params: any, body: any, medicaoMD30Repository: MedicaoMD30Repository): Promise<Array<MedicaoMD30>> {
    const { measurerIP } = params;
    const getFatoresDePotenciaPerDateRangeUseCase = new GetFatoresDePotenciaPerDateRange(medicaoMD30Repository).execute(measurerIP);
    return getFatoresDePotenciaPerDateRangeUseCase;
  }
}