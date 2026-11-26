import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(parcelaId, cultivadorId) {
  return eliminarAsignacionRepository(parcelaId, cultivadorId);
}
