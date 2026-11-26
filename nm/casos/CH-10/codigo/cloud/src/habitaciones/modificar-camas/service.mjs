import { modificarCamasRepository } from './repository.mjs';

export function modificarCamasService(habitacionId, camas) {
  return modificarCamasRepository(habitacionId, camas);
}
