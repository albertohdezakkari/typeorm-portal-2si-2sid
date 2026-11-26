import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(animalId, cuidadorId) {
  return eliminarAsignacionRepository(animalId, cuidadorId);
}
