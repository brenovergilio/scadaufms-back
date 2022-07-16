import MedicaoMD30 from '@src/entities/MedicaoMD30';
import GetTensoesPerDateRange from '@src/usecases/MedicaoMD30Related/GetTensoesPerDateRange';
import GetCorrentesPerDateRange from '@src/usecases/MedicaoMD30Related/GetCorrentesPerDateRange';
import GetPotenciasAtivasPerDateRange from '@src/usecases/MedicaoMD30Related/GetPotenciasAtivasPerDateRange';
import GetPotenciasReativasPerDateRange from '@src/usecases/MedicaoMD30Related/GetPotenciasReativasPerDateRange';
import GetPotenciasAparentesPerDateRange from '@src/usecases/MedicaoMD30Related/GetPotenciasAparentesPerDateRange';
import GetFatoresDePotenciaPerDateRange from '@src/usecases/MedicaoMD30Related/GetFatoresDePotenciaPerDateRange';
import MedicaoMD30Repository from '@src/entities/repositories/MedicaoMD30Repository';
import DateRange from '@src/usecases/util/DateRange';
import GetConsumosAtivosPerDateRange from '@src/usecases/MedicaoMD30Related/GetConsumoAtivoPerDateRange';
import GetConsumosReativosPerDateRange from '@src/usecases/MedicaoMD30Related/GetConsumosReativosPerDateRange';
import GetDemandasAtivasPerDateRange from '@src/usecases/MedicaoMD30Related/GetDemandasAtivasPerDateRange';
import GetDemandasReativasPerDateRange from '@src/usecases/MedicaoMD30Related/GetDemandasReativasPerDateRange';
import GetAllMedicoesPerDateRange from '@src/usecases/MedicaoMD30Related/GetAllMedicoesPerDateRange';
import GetAllPotenciasPerDateRange from '@src/usecases/MedicaoMD30Related/GetAllPotenciasAtivasPerDateRange';
import GetTensoesAndCorrentesPerDateRange from '@src/usecases/MedicaoMD30Related/GetTensoesAndCorrentesPerDateRange';

export default class MedicaoMD30Controller {
  static getConsumosAtivosPerDateRange(
    params: any,
    body: any,
    query: any,
    headers: any,
    medicaoMD30Repository: MedicaoMD30Repository
  ): Promise<Array<MedicaoMD30>> {
    const { measurerID } = params;
    const { initialDate, finalDate } = query;
    const dateRange: DateRange = new DateRange(
      new Date(initialDate),
      new Date(finalDate)
    );
    const getConsumosAtivosPerDateRangeUseCase =
      new GetConsumosAtivosPerDateRange(medicaoMD30Repository).execute(
        measurerID,
        dateRange
      );
    return getConsumosAtivosPerDateRangeUseCase;
  }

  static getConsumosReativosPerDateRange(
    params: any,
    body: any,
    query: any,
    headers: any,
    medicaoMD30Repository: MedicaoMD30Repository
  ): Promise<Array<MedicaoMD30>> {
    const { measurerID } = params;
    const { initialDate, finalDate } = query;
    const dateRange: DateRange = new DateRange(
      new Date(initialDate),
      new Date(finalDate)
    );
    const getConsumosReativosPerDateRangeUseCase =
      new GetConsumosReativosPerDateRange(medicaoMD30Repository).execute(
        measurerID,
        dateRange
      );
    return getConsumosReativosPerDateRangeUseCase;
  }

  static getDemandasAtivasPerDateRange(
    params: any,
    body: any,
    query: any,
    headers: any,
    medicaoMD30Repository: MedicaoMD30Repository
  ): Promise<Array<MedicaoMD30>> {
    const { measurerID } = params;
    const { initialDate, finalDate } = query;
    const dateRange: DateRange = new DateRange(
      new Date(initialDate),
      new Date(finalDate)
    );
    const getDemandasAtivasPerDateRangeUseCase =
      new GetDemandasAtivasPerDateRange(medicaoMD30Repository).execute(
        measurerID,
        dateRange
      );
    return getDemandasAtivasPerDateRangeUseCase;
  }

  static getDemandasReativasPerDateRange(
    params: any,
    body: any,
    query: any,
    headers: any,
    medicaoMD30Repository: MedicaoMD30Repository
  ): Promise<Array<MedicaoMD30>> {
    const { measurerID } = params;
    const { initialDate, finalDate } = query;
    const dateRange: DateRange = new DateRange(
      new Date(initialDate),
      new Date(finalDate)
    );
    const getDemandasReativasPerDateRangeUseCase =
      new GetDemandasReativasPerDateRange(medicaoMD30Repository).execute(
        measurerID,
        dateRange
      );
    return getDemandasReativasPerDateRangeUseCase;
  }

  static getAllMedicoesPerDateRange(
    params: any,
    body: any,
    query: any,
    headers: any,
    medicaoMD30Repository: MedicaoMD30Repository
  ): Promise<Array<MedicaoMD30>> {
    const { measurerID } = params;
    const { initialDate, finalDate } = query;
    const dateRange: DateRange = new DateRange(
      new Date(initialDate),
      new Date(finalDate)
    );
    const getAllMedicoesPerDateRangeUseCase = new GetAllMedicoesPerDateRange(
      medicaoMD30Repository
    ).execute(measurerID, dateRange);
    return getAllMedicoesPerDateRangeUseCase;
  }

  static getTensoesPerDateRange(
    params: any,
    body: any,
    query: any,
    headers: any,
    medicaoMD30Repository: MedicaoMD30Repository
  ): Promise<Array<MedicaoMD30>> {
    const { measurerID } = params;
    const { initialDate, finalDate } = query;
    const dateRange: DateRange = new DateRange(
      new Date(initialDate),
      new Date(finalDate)
    );
    const getTensoesPerDateRangeUseCase = new GetTensoesPerDateRange(
      medicaoMD30Repository
    ).execute(measurerID, dateRange);
    return getTensoesPerDateRangeUseCase;
  }

  static getCorrentesPerDateRange(
    params: any,
    body: any,
    query: any,
    headers: any,
    medicaoMD30Repository: MedicaoMD30Repository
  ): Promise<Array<MedicaoMD30>> {
    const { measurerID } = params;
    const { initialDate, finalDate } = query;
    const dateRange: DateRange = new DateRange(
      new Date(initialDate),
      new Date(finalDate)
    );
    const getCorrentesPerDateRangeUseCase = new GetCorrentesPerDateRange(
      medicaoMD30Repository
    ).execute(measurerID, dateRange);
    return getCorrentesPerDateRangeUseCase;
  }

  static getPotenciasAtivasPerDateRange(
    params: any,
    body: any,
    query: any,
    headers: any,
    medicaoMD30Repository: MedicaoMD30Repository
  ): Promise<Array<MedicaoMD30>> {
    const { measurerID } = params;
    const { initialDate, finalDate } = query;
    const dateRange: DateRange = new DateRange(
      new Date(initialDate),
      new Date(finalDate)
    );
    const getPotenciasAtivasPerDateRangeUseCase =
      new GetPotenciasAtivasPerDateRange(medicaoMD30Repository).execute(
        measurerID,
        dateRange
      );
    return getPotenciasAtivasPerDateRangeUseCase;
  }

  static getPotenciasReativasPerDateRange(
    params: any,
    body: any,
    query: any,
    headers: any,
    medicaoMD30Repository: MedicaoMD30Repository
  ): Promise<Array<MedicaoMD30>> {
    const { measurerID } = params;
    const { initialDate, finalDate } = query;
    const dateRange: DateRange = new DateRange(
      new Date(initialDate),
      new Date(finalDate)
    );
    const getPotenciasReativasPerDateRangeUseCase =
      new GetPotenciasReativasPerDateRange(medicaoMD30Repository).execute(
        measurerID,
        dateRange
      );
    return getPotenciasReativasPerDateRangeUseCase;
  }

  static getPotenciasAparentesPerDateRange(
    params: any,
    body: any,
    query: any,
    headers: any,
    medicaoMD30Repository: MedicaoMD30Repository
  ): Promise<Array<MedicaoMD30>> {
    const { measurerID } = params;
    const { initialDate, finalDate } = query;
    const dateRange: DateRange = new DateRange(
      new Date(initialDate),
      new Date(finalDate)
    );
    const getPotenciasAparentesPerDateRangeUseCase =
      new GetPotenciasAparentesPerDateRange(medicaoMD30Repository).execute(
        measurerID,
        dateRange
      );
    return getPotenciasAparentesPerDateRangeUseCase;
  }

  static getAllPotenciasPerDateRange(
    params: any,
    body: any,
    query: any,
    headers: any,
    medicaoMD30Repository: MedicaoMD30Repository
  ): Promise<Array<MedicaoMD30>> {
    const { measurerID } = params;
    const { initialDate, finalDate } = query;
    const dateRange: DateRange = new DateRange(
      new Date(initialDate),
      new Date(finalDate)
    );
    const getAllPotenciasPerDateRangeUseCase =
      new GetAllPotenciasPerDateRange(medicaoMD30Repository).execute(
        measurerID,
        dateRange
      );
    return getAllPotenciasPerDateRangeUseCase;
  }

  static getTensoesAndCorrentesPerDateRange(
    params: any,
    body: any,
    query: any,
    headers: any,
    medicaoMD30Repository: MedicaoMD30Repository
  ): Promise<Array<MedicaoMD30>> {
    const { measurerID } = params;
    const { initialDate, finalDate } = query;
    const dateRange: DateRange = new DateRange(
      new Date(initialDate),
      new Date(finalDate)
    );
    const getTensoesAndCorrentesPerDateRange =
      new GetTensoesAndCorrentesPerDateRange(medicaoMD30Repository).execute(
        measurerID,
        dateRange
      );
    return getTensoesAndCorrentesPerDateRange;
  }

  static getFatoresDePotenciaPerDateRange(
    params: any,
    body: any,
    query: any,
    headers: any,
    medicaoMD30Repository: MedicaoMD30Repository
  ): Promise<Array<MedicaoMD30>> {
    const { measurerID } = params;
    const { initialDate, finalDate } = query;
    const dateRange: DateRange = new DateRange(
      new Date(initialDate),
      new Date(finalDate)
    );
    const getFatoresDePotenciaPerDateRangeUseCase =
      new GetFatoresDePotenciaPerDateRange(medicaoMD30Repository).execute(
        measurerID,
        dateRange
      );
    return getFatoresDePotenciaPerDateRangeUseCase;
  }
}
