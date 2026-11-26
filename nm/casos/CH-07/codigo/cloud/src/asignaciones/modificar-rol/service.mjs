import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(excursionId, guiaId, rol) {
  return modificarRolRepository(excursionId, guiaId, rol);
}
