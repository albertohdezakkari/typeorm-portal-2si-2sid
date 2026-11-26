import { buscarGimnasioRepository, consultarGimnasioRepository } from './repository.mjs';

export async function consultarGimnasioService(gimnasioId, minimo) {
  const gimnasio = await buscarGimnasioRepository(gimnasioId);
  if (!gimnasio) throw new Error('Gimnasio no encontrado');
  const sesiones = await consultarGimnasioRepository(gimnasioId, minimo);
  return { gimnasio, sesiones };
}
