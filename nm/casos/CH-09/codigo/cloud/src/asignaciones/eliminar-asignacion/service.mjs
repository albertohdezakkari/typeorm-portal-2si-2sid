import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(reparacionId, mecanicoId) {
  return eliminarAsignacionRepository(reparacionId, mecanicoId);
}
