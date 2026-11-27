import { crearViveroRepository, listarViverosRepository } from './repository.mjs';

export async function crearViveroService(nombre) {
  const viveroId = Date.now();
  const vivero = { viveroId, nombre };
  await crearViveroRepository(vivero);
  return vivero;
}

export function listarViverosService() {
  return listarViverosRepository();
}