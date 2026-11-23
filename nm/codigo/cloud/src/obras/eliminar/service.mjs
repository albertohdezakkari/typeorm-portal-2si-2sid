import { eliminarObraRepository } from './repository.mjs';

export async function eliminarObraService(obraId) {
  await eliminarObraRepository(obraId);
}
