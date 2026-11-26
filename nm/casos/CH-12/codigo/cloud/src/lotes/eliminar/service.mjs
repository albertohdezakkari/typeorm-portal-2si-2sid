import { eliminarLoteRepository } from './repository.mjs';

export async function eliminarLoteService(loteId) {
  await eliminarLoteRepository(loteId);
}
