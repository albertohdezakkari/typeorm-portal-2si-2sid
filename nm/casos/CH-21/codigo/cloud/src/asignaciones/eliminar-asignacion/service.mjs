import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(muestraId, analistaId) {
  return eliminarAsignacionRepository(muestraId, analistaId);
}
