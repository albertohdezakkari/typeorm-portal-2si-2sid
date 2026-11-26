import { modificarKilosRepository } from './repository.mjs';

export function modificarKilosService(loteId, kilos) {
  return modificarKilosRepository(loteId, kilos);
}
