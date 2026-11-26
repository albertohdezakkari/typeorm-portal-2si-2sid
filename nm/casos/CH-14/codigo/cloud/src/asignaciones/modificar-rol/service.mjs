import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(zonaId, jardineroId, rol) {
  return modificarRolRepository(zonaId, jardineroId, rol);
}
