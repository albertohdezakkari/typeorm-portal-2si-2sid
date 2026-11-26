import { eliminarExcursionRepository } from './repository.mjs';

export async function eliminarExcursionService(excursionId) {
  await eliminarExcursionRepository(excursionId);
}
