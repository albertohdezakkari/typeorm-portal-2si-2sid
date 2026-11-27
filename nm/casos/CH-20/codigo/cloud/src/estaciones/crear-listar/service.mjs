import { crearEstacionRepository, listarEstacionesRepository } from './repository.mjs';

export async function crearEstacionService(nombre) {
  const estacionId = Date.now();
  const estacion = { estacionId, nombre };
  await crearEstacionRepository(estacion);
  return estacion;
}

export function listarEstacionesService() {
  return listarEstacionesRepository();
}