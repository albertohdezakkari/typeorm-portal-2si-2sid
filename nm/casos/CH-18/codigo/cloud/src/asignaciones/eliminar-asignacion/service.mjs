import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(actividadId, monitorId) {
  return eliminarAsignacionRepository(actividadId, monitorId);
}
