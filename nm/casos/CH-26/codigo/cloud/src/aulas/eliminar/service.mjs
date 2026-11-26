import { eliminarAulaRepository } from './repository.mjs';

export async function eliminarAulaService(aulaId) {
  await eliminarAulaRepository(aulaId);
}
