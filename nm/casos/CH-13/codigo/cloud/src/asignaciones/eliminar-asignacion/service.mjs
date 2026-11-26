import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(proyeccionId, tecnicoId) {
  return eliminarAsignacionRepository(proyeccionId, tecnicoId);
}
