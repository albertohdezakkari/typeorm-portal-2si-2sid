import { crearEscenaRepository, listarEscenasRepository } from './repository.mjs';

export async function crearEscenaService(nombre, duracionSegundos, estudioId) {
  const escenaId = Date.now();
  const escena = { escenaId, nombre, duracionSegundos, estudioId };
  await crearEscenaRepository(escena);
  return escena;
}

export function listarEscenasService() {
  return listarEscenasRepository();
}
