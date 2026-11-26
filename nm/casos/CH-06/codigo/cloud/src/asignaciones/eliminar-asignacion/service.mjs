import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(sesionId, instructorId) {
  return eliminarAsignacionRepository(sesionId, instructorId);
}
