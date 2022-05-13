import MedidorMD30Repository from '@src/entities/repositories/MedidorMD30Repository';

export async function existsByID(
  id: string,
  medidorMD30Repository: MedidorMD30Repository
): Promise<boolean> {
  const medidorMD30 = await medidorMD30Repository.getMedidorMD30ByID(id);
  return medidorMD30 ? true : false;
}

export async function existsByIP(
  ip: string,
  medidorMD30Repository: MedidorMD30Repository
): Promise<boolean> {
  const medidorMD30 = await medidorMD30Repository.getMedidorMD30ByIP(ip);
  return medidorMD30 ? true : false;
}
