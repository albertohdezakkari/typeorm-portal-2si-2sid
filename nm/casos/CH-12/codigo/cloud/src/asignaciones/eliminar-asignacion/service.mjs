import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(loteId, inspectorId) {
  return eliminarAsignacionRepository(loteId, inspectorId);
}
