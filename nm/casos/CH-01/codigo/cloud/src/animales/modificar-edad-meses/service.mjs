import { modificarEdadMesesRepository } from './repository.mjs';

export function modificarEdadMesesService(animalId, edadMeses) {
  return modificarEdadMesesRepository(animalId, edadMeses);
}
