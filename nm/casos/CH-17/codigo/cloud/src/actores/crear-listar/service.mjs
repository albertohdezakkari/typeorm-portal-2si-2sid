import { crearActorRepository, listarActoresRepository } from './repository.mjs';

export async function crearActorService(nombre, apellidos, email) {
  const actorId = Date.now();
  const actor = { actorId, nombre, apellidos, email };
  await crearActorRepository(actor);
  return actor;
}

export function listarActoresService() {
  return listarActoresRepository();
}
