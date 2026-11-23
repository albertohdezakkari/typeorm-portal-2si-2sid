import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(obraId, profesionalId) {
  return eliminarAsignacionRepository(obraId, profesionalId);
}
