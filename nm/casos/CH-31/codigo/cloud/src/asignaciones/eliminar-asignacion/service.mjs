import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(documentoId, revisorId) {
  return eliminarAsignacionRepository(documentoId, revisorId);
}
