import MedicaoMD30 from "@src/entities/MedicaoMD30";

export default class MedicaoMD30Adapter {
  static create(measurerIP: string, timestamp: Date, ...values: Array<number>) {
    //TODO: find a better way to solve required fields
    const requiredFields: Array<string> = ["Tensao Fase A", "Tensao Fase B", "Tensao Fase C", "Corrente Fase A", "Corrente Fase B", "Corrente Fase C", "Potencia Ativa Fase A", "Potencia Ativa Fase B", "Potencia Ativa Fase C", "Potencia Ativa Total", "Potencia Reativa Fase A", "Potencia Reativa Fase B", "Potencia Reativa Fase C", "Potencia Reativa Total", "Potencia Aparente Fase A", "Potencia Aparente Fase B", "Potencia Aparente Fase C", "Potencia Aparente Total", "Fator de Potencia Fase A", "Fator de Potencia Fase B", "Fator de Potencia Fase C", "Fator de Potencia Total"]
    const valuesMap = new Map<string, number>();
    requiredFields.forEach((value, index) => valuesMap.set(value, values[index]));
    return new MedicaoMD30(measurerIP, timestamp, valuesMap);
  }
}

//timestamp, tensao_fase_a, tensao_fase_b, tensao_fase_c, corrente_fase_a, corrente_fase_b, corrente_fase_c, potencia_ativa_a, potencia_ativa_b, potencia_ativa_c, potencia_ativa_total, potencia_reativa_a, potencia_reativa_b, potencia_reativa_c, potencia_reativa_total, potencia_aparente_a, potencia_aparente_b, potencia_aparente_c, potencia_aparente_total, fator_potencia_a, fator_potencia_b, fator_potencia_c, fator_potencia_total