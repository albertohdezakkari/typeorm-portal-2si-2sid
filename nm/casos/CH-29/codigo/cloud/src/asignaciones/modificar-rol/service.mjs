import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(cosechaId, agricultorId, rol) {
  return modificarRolRepository(cosechaId, agricultorId, rol);
}
