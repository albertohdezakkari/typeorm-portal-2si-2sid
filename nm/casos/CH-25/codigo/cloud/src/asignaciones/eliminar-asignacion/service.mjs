import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(programaId, locutorId) {
  return eliminarAsignacionRepository(programaId, locutorId);
}
