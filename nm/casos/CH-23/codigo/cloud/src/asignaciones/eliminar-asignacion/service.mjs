import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(comandaId, cocineroId) {
  return eliminarAsignacionRepository(comandaId, cocineroId);
}
