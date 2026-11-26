import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(pistaId, entrenadorId, rol) {
  return modificarRolRepository(pistaId, entrenadorId, rol);
}
