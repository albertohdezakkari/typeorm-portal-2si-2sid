import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(reparacionId, mecanicoId, rol) {
  return modificarRolRepository(reparacionId, mecanicoId, rol);
}
