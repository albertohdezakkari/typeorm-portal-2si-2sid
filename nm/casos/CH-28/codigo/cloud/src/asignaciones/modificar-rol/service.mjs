import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(plantaId, jardineroId, rol) {
  return modificarRolRepository(plantaId, jardineroId, rol);
}
