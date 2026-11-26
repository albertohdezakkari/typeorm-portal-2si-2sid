import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(parcelaId, cultivadorId, rol) {
  return modificarRolRepository(parcelaId, cultivadorId, rol);
}
