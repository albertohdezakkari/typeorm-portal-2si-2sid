import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(actuacionId, artistaId, rol) {
  return modificarRolRepository(actuacionId, artistaId, rol);
}
