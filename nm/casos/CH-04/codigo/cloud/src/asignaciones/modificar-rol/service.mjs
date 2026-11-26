import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(publicacionId, autorId, rol) {
  return modificarRolRepository(publicacionId, autorId, rol);
}
