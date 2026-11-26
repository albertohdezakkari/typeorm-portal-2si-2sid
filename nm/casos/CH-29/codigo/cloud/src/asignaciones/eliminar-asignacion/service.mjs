import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(cosechaId, agricultorId) {
  return eliminarAsignacionRepository(cosechaId, agricultorId);
}
