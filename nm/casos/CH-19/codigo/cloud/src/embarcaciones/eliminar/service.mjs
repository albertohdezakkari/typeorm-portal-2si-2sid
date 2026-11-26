import { eliminarEmbarcacionRepository } from './repository.mjs';

export async function eliminarEmbarcacionService(embarcacionId) {
  await eliminarEmbarcacionRepository(embarcacionId);
}
