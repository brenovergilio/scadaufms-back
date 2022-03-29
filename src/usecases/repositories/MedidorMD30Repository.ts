import MedidorMD30 from "@src/entities/medidor-md30";

export default interface MedidorMD30Repository {
  getAllMedidoresMD30(): Array<MedidorMD30>;
}