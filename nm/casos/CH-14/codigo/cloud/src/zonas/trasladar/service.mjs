import { trasladarZonaRepository } from './repository.mjs';
import { buscarParqueRepository } from '../../parques/consultar/repository.mjs';

export async function trasladarZonaService(zonaId, parqueId) {
  const parque = await buscarParqueRepository(parqueId);
  if (!parque) throw new Error('Parque no encontrado');
  return trasladarZonaRepository(zonaId, parqueId);
}
