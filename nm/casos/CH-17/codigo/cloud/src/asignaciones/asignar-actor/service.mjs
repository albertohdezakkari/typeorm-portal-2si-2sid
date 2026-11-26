import { buscarEscenaRepository, buscarActorRepository, asignarActorRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarActorService(escenaId, actorId, rol) {
  const escena = await buscarEscenaRepository(escenaId);
  const actor = await buscarActorRepository(actorId);
  if (!escena || !actor) {
    throw new ReferenciaInexistenteError('No existe la escena o el actor');
  }
  return asignarActorRepository(escenaId, actorId, rol);
}
