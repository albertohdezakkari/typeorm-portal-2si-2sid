import { buscarAyuntamientoRepository, consultarAyuntamientoRepository } from './repository.mjs';

export async function consultarAyuntamientoService(ayuntamientoId, minimo) {
  const ayuntamiento = await buscarAyuntamientoRepository(ayuntamientoId);
  if (!ayuntamiento) throw new Error('Ayuntamiento no encontrado');
  const obras = await consultarAyuntamientoRepository(ayuntamientoId, minimo);
  return { ayuntamiento, obras };
}
