import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(excursionId, guiaId) {
  return eliminarAsignacionRepository(excursionId, guiaId);
}
