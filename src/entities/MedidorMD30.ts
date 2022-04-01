import Measurer from "./interfaces/Measurer";
import Peak from "./interfaces/Peak";
import MedicaoMD30 from "./MedicaoMD30";

export default class MedidorMD30 implements Measurer {

  ip: string;
  name: string;
  port: number;
  peak: Peak;
  medicoesMD30: Array<MedicaoMD30>;

  constructor(ip: string, name: string, port: number, peak: Peak = {hour: 17, minute: 30, interval: 3}, medicoesMD30: Array<MedicaoMD30> = new Array<MedicaoMD30>()) {
    this.ip = ip;
    this.name = name;
    this.port = port;
    this.peak = peak;
    this.medicoesMD30 = medicoesMD30;
  }

  getTensoesWithTimestamps(): Array<MedicaoMD30> {
    return this.getSpecificMeasurementsWithTimestamps('Tensao');
  }

  getCorrentesWithTimestamps(): Array<MedicaoMD30> {
    return this.getSpecificMeasurementsWithTimestamps('Corrente')
  }

  getPotenciasAtivasWithTimestamps(): Array<MedicaoMD30> {
    return this.getSpecificMeasurementsWithTimestamps('Potencia Ativa', true);
  }

  getPotenciasReativasWithTimestamps(): Array<MedicaoMD30> {
    return this.getSpecificMeasurementsWithTimestamps('Potencia Reativa', true);
  }

  getPotenciasAparentesWithTimestamps(): Array<MedicaoMD30> {
    return this.getSpecificMeasurementsWithTimestamps('Potencia Aparente', true);
  }

  getFatoresDePotenciaWithTimestamps(): Array<MedicaoMD30> {
    return this.getSpecificMeasurementsWithTimestamps('Fator de Potencia', true);
  }

  getSpecificMeasurementsWithTimestamps(measurementName: string, includeTotal = false): Array<MedicaoMD30> {
    const measurementsWithTimestamps: Array<MedicaoMD30> = new Array<MedicaoMD30>();

    for(const medicao of this.medicoesMD30) {
      const measurement: Map<string, number> = new Map<string, number>();
      
      measurement.set(`${measurementName} Fase A`, medicao.values.get(`${measurementName} Fase A`) ?? 0.0);
      measurement.set(`${measurementName} Fase B`, medicao.values.get(`${measurementName} Fase B`) ?? 0.0);
      measurement.set(`${measurementName} Fase C`, medicao.values.get(`${measurementName} Fase C`) ?? 0.0);

      if(includeTotal)
        measurement.set(`${measurementName} Total`, medicao.values.get(`${measurementName} Total`) ?? 0.0);
      
      const measurementsAndTimestamp: MedicaoMD30 = new MedicaoMD30(medicao.timestamp, measurement);
      measurementsWithTimestamps.push(measurementsAndTimestamp);
    }

    return measurementsWithTimestamps;
  }
}