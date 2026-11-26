import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(habitacionId, enfermeroId) {
  return eliminarAsignacionRepository(habitacionId, enfermeroId);
}
