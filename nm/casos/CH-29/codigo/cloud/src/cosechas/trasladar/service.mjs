import { trasladarCosechaRepository } from './repository.mjs';
import { buscarGranjaRepository } from '../../granjas/consultar/repository.mjs';

export async function trasladarCosechaService(cosechaId, granjaId) {
  const granja = await buscarGranjaRepository(granjaId);
  if (!granja) throw new Error('Granja no encontrado');
  return trasladarCosechaRepository(cosechaId, granjaId);
}
