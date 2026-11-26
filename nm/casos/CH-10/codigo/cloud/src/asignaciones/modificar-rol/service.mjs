import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(habitacionId, enfermeroId, rol) {
  return modificarRolRepository(habitacionId, enfermeroId, rol);
}
