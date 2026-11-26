import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(funcionId, interpreteId) {
  return eliminarAsignacionRepository(funcionId, interpreteId);
}
