import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(aulaId, docenteId) {
  return eliminarAsignacionRepository(aulaId, docenteId);
}
