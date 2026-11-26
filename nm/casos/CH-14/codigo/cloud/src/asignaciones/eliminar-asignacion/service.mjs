import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(zonaId, jardineroId) {
  return eliminarAsignacionRepository(zonaId, jardineroId);
}
