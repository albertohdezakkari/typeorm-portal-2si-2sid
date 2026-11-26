import { crearActuacionRepository, listarActuacionesRepository } from './repository.mjs';

export async function crearActuacionService(nombre, duracionMinutos, festivalId) {
  const actuacionId = Date.now();
  const actuacion = { actuacionId, nombre, duracionMinutos, festivalId };
  await crearActuacionRepository(actuacion);
  return actuacion;
}

export function listarActuacionesService() {
  return listarActuacionesRepository();
}
