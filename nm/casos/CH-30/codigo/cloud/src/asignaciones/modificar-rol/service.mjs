import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(funcionId, interpreteId, rol) {
  return modificarRolRepository(funcionId, interpreteId, rol);
}
