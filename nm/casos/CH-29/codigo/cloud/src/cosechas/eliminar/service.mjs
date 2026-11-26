import { eliminarCosechaRepository } from './repository.mjs';

export async function eliminarCosechaService(cosechaId) {
  await eliminarCosechaRepository(cosechaId);
}
