import { crearCineRepository, listarCinesRepository } from './repository.mjs';

export async function crearCineService(nombre) {
  const cineId = Date.now();
  const cine = { cineId, nombre };
  await crearCineRepository(cine);
  return cine;
}

export function listarCinesService() {
  return listarCinesRepository();
}