import { crearParqueRepository, listarParquesRepository } from './repository.mjs';

export async function crearParqueService(nombre) {
  const parqueId = Date.now();
  const parque = { parqueId, nombre };
  await crearParqueRepository(parque);
  return parque;
}

export function listarParquesService() {
  return listarParquesRepository();
}