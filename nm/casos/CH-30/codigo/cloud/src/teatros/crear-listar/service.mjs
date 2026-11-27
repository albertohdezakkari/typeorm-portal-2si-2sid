import { crearTeatroRepository, listarTeatrosRepository } from './repository.mjs';

export async function crearTeatroService(nombre) {
  const teatroId = Date.now();
  const teatro = { teatroId, nombre };
  await crearTeatroRepository(teatro);
  return teatro;
}

export function listarTeatrosService() {
  return listarTeatrosRepository();
}