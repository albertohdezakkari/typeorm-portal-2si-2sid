import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(proyectoId, colaboradorId) {
  return eliminarAsignacionRepository(proyectoId, colaboradorId);
}
