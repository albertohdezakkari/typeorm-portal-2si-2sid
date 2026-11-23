import { trasladarObraRepository } from './repository.mjs';
import { buscarAyuntamientoRepository } from '../../ayuntamientos/consultar/repository.mjs';

export async function trasladarObraService(obraId, ayuntamientoId) {
  const ayuntamiento = await buscarAyuntamientoRepository(ayuntamientoId);
  if (!ayuntamiento) throw new Error('Ayuntamiento no encontrado');
  return trasladarObraRepository(obraId, ayuntamientoId);
}
