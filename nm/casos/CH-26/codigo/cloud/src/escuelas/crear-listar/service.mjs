import { crearEscuelaRepository, listarEscuelasRepository } from './repository.mjs';

export async function crearEscuelaService(nombre) {
  const escuelaId = Date.now();
  const escuela = { escuelaId, nombre };
  await crearEscuelaRepository(escuela);
  return escuela;
}

export function listarEscuelasService() {
  return listarEscuelasRepository();
}