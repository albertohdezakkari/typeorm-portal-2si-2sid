import { buscarCineRepository, consultarCineRepository } from './repository.mjs';

export async function consultarCineService(cineId, minimo) {
  const cine = await buscarCineRepository(cineId);
  if (!cine) throw new Error('Cine no encontrado');
  const proyecciones = await consultarCineRepository(cineId, minimo);
  return { cine, proyecciones };
}
