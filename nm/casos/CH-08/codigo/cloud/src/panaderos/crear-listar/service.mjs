import { crearPanaderoRepository, listarPanaderosRepository } from './repository.mjs';

export async function crearPanaderoService(nombre, apellidos, email) {
  const panaderoId = Date.now();
  const panadero = { panaderoId, nombre, apellidos, email };
  await crearPanaderoRepository(panadero);
  return panadero;
}

export function listarPanaderosService() {
  return listarPanaderosRepository();
}
