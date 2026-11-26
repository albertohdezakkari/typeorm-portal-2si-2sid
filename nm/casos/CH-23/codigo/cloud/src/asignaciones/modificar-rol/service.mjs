import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(comandaId, cocineroId, rol) {
  return modificarRolRepository(comandaId, cocineroId, rol);
}
