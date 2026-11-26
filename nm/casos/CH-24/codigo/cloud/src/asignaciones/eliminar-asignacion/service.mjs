import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(pistaId, entrenadorId) {
  return eliminarAsignacionRepository(pistaId, entrenadorId);
}
