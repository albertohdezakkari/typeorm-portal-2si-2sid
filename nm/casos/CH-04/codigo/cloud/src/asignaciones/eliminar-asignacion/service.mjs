import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(publicacionId, autorId) {
  return eliminarAsignacionRepository(publicacionId, autorId);
}
