import Measurement from "@src/entities/interfaces/measurement";
import MedidorMD30 from "@src/entities/medidor-md30";

describe("MedidorMD30", () => {
  it("Should add a measurement to measurer", () => {
    const medidorMD30 = new MedidorMD30('200.129.210.97', 'Reitoria', 1001);
    const timestamp = new Date(2022, 10, 10, 20, 30, 30);
    const labels = ['Tensão Fase A', 'Tensão Fase B', 'Tensão Fase C']
    const values =  [125.6, 127.9, 130.1]
    const measurementMap = new Map<string, number>();
    values.forEach((element, index) => {
      const key: string = labels[index];
      measurementMap.set(key, element)
    });
    const measurement = {
      timestamp: timestamp,
      values: measurementMap
    }
    medidorMD30.addMeasurement(measurement)
    expect(medidorMD30.measurements.length).toBe(1);
  });

  it("Should return all measurements, given a date interval", () => {
    const medidorMD30 = new MedidorMD30('200.129.210.97', 'Reitoria', 1001);
    const timestamp = new Date(2022, 10, 10, 20, 30, 30);
    const labels = ['Tensão Fase A', 'Tensão Fase B', 'Tensão Fase C'];
    const values =  [125.6, 127.9, 130.1];
    const measurementMap = new Map<string, number>();
    values.forEach((element, index) => {
      const key: string = labels[index];
      measurementMap.set(key, element)
    });
    const measurement = {
      timestamp: timestamp,
      values: measurementMap
    }
    medidorMD30.addMeasurement(measurement);
   
    const measurements: Array<Measurement> = medidorMD30.getMeasurements();

    expect(measurements.length).toBe(1)
  })
})