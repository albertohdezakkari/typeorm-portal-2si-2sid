import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(escenaId, actorId) {
  return eliminarAsignacionRepository(escenaId, actorId);
}
