import { crearReparacionRepository, listarReparacionesRepository } from './repository.mjs';

export async function crearReparacionService(nombre, costeCentimos, tallerId) {
  const reparacionId = Date.now();
  const reparacion = { reparacionId, nombre, costeCentimos, tallerId };
  await crearReparacionRepository(reparacion);
  return reparacion;
}

export function listarReparacionesService() {
  return listarReparacionesRepository();
}
