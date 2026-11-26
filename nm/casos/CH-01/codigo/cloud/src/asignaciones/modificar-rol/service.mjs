import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(animalId, cuidadorId, rol) {
  return modificarRolRepository(animalId, cuidadorId, rol);
}
