import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(obraId, profesionalId, rol) {
  return modificarRolRepository(obraId, profesionalId, rol);
}
