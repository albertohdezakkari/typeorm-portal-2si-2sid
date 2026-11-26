import { crearCocineroRepository, listarCocinerosRepository } from './repository.mjs';

export async function crearCocineroService(nombre, apellidos, email) {
  const cocineroId = Date.now();
  const cocinero = { cocineroId, nombre, apellidos, email };
  await crearCocineroRepository(cocinero);
  return cocinero;
}

export function listarCocinerosService() {
  return listarCocinerosRepository();
}
