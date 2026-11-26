import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(escenaId, actorId, rol) {
  return modificarRolRepository(escenaId, actorId, rol);
}
