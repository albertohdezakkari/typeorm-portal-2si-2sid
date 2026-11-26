import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(actuacionId, artistaId) {
  return eliminarAsignacionRepository(actuacionId, artistaId);
}
