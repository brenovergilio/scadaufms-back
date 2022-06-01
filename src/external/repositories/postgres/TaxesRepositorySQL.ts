import TaxesRepository from '@src/entities/repositories/TaxesRepository';
import Taxes, { TaxType } from '@src/entities/Taxes';
import db from '@src/external/database/postgres/database';

export default class TaxesRepositorySQL implements TaxesRepository {
  async getAllTaxes(): Promise<Array<Taxes>> {
    const taxesData = await db.manyOrNone('SELECT * FROM tarifas');

    const taxes = taxesData.map((tax) => {
      return new Taxes(
        tax.tipo,
        tax.demanda_ponta,
        tax.demanda_fora_ponta,
        tax.demanda_unica,
        tax.consumo_ponta,
        tax.consumo_fora_ponta,
        tax.id
      );
    });

    return taxes;
  }

  async getSpecificTax(type: TaxType): Promise<Taxes | null> {
    const taxesData = await db.oneOrNone(
      'SELECT * FROM tarifas WHERE tipo=$1',
      [type]
    );

    if (taxesData)
      return new Taxes(
        taxesData.tipo,
        taxesData.demanda_ponta,
        taxesData.demanda_fora_ponta,
        taxesData.demanda_unica,
        taxesData.consumo_ponta,
        taxesData.consumo_fora_ponta,
        taxesData.id
      );
    return null;
  }

  async updateTaxes(taxes: Taxes): Promise<Taxes> {
    const taxesData = await db.one(
      'UPDATE tarifas SET demanda_ponta=$1, demanda_fora_ponta=$2, demanda_unica=$3, consumo_ponta=$4, consumo_fora_ponta=$5 WHERE tipo=$6 RETURNING *',
      [
        taxes.demandaPonta,
        taxes.demandaForaPonta,
        taxes.demandaUnica,
        taxes.consumoPonta,
        taxes.consumoForaPonta,
        taxes.type,
      ]
    );
    return new Taxes(
      taxesData.tipo,
      taxesData.demanda_ponta,
      taxesData.demanda_fora_ponta,
      taxesData.demanda_unica,
      taxesData.consumo_ponta,
      taxesData.consumo_fora_ponta,
      taxesData.id
    );
  }
}
