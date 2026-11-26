import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(programaId, locutorId, rol) {
  return modificarRolRepository(programaId, locutorId, rol);
}
