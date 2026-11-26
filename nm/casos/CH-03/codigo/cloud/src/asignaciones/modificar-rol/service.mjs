import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(piezaId, restauradorId, rol) {
  return modificarRolRepository(piezaId, restauradorId, rol);
}
