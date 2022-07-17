import MedicaoMD30 from '@src/entities/MedicaoMD30';
import DateRange from '../util/DateRange';
import InvalidValueError from '../util/errors/InvalidValueError';
import BaseMedicaoMD30UseCases from './BaseMedicaoMD30UseCases';

export default class GetFatoresDePotenciaCorrigidosUseCase extends BaseMedicaoMD30UseCases {
  async execute(
    id: string,
    potenciaAparenteCapacitiva: number,
    dateRange: DateRange
  ): Promise<Array<MedicaoMD30>> {
    if (Number.isNaN(Number(potenciaAparenteCapacitiva)))
      throw new InvalidValueError();

    const potencias: Array<MedicaoMD30> =
      await this.medicaoMD30Repository.getAllPotenciasPerDateRange(
        id,
        dateRange
      );

    const potenciasCorrigidas = potencias.map((potencias) => {
      const iterator = potencias.values.values();
      const potenciaAtiva = iterator.next().value;
      iterator.next().value;
      const potenciaAparente = iterator.next().value;

      const fatorPotenciaCorrigido =
        potenciaAtiva /
        Math.sqrt(
          Math.pow(potenciaAparente - potenciaAparenteCapacitiva, 2) +
            Math.pow(potenciaAtiva, 2)
        );
      const mapValue = new Map<string, number>();
      mapValue.set('Fator de Potencia Corrigido', fatorPotenciaCorrigido);
      return new MedicaoMD30(
        potencias.measurerID,
        potencias.timestamp,
        mapValue
      );
    });

    return potenciasCorrigidas;
  }
}
