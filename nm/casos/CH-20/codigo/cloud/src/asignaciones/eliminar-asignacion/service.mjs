import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(trayectoId, conductorId) {
  return eliminarAsignacionRepository(trayectoId, conductorId);
}
