import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(plazaId, tecnicoId) {
  return eliminarAsignacionRepository(plazaId, tecnicoId);
}
