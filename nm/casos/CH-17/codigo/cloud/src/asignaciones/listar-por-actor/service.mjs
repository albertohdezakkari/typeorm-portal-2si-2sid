import { listarAsignacionesPorActorRepository } from './repository.mjs';

export function listarAsignacionesPorActorService(actorId) {
  return listarAsignacionesPorActorRepository(actorId);
}
