import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(piezaId, restauradorId) {
  return eliminarAsignacionRepository(piezaId, restauradorId);
}
