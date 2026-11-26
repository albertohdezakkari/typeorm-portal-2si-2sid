import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(embarcacionId, tripulanteId) {
  return eliminarAsignacionRepository(embarcacionId, tripulanteId);
}
