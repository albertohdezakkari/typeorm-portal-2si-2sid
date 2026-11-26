import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(embarcacionId, tripulanteId, rol) {
  return modificarRolRepository(embarcacionId, tripulanteId, rol);
}
