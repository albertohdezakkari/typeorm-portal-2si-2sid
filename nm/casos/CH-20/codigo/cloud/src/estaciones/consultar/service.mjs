import { buscarEstacionRepository, consultarEstacionRepository } from './repository.mjs';

export async function consultarEstacionService(estacionId, minimo) {
  const estacion = await buscarEstacionRepository(estacionId);
  if (!estacion) throw new Error('Estacion no encontrado');
  const trayectos = await consultarEstacionRepository(estacionId, minimo);
  return { estacion, trayectos };
}
