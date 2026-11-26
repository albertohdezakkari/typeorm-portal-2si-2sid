import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(reservaId, huespedId) {
  return eliminarAsignacionRepository(reservaId, huespedId);
}
