import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(plantaId, jardineroId) {
  return eliminarAsignacionRepository(plantaId, jardineroId);
}
