import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(sesionId, instructorId, rol) {
  return modificarRolRepository(sesionId, instructorId, rol);
}
