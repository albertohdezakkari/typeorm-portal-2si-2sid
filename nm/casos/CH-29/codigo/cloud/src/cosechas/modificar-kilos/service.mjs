import { modificarKilosRepository } from './repository.mjs';

export function modificarKilosService(cosechaId, kilos) {
  return modificarKilosRepository(cosechaId, kilos);
}
