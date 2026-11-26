import { eliminarPistaRepository } from './repository.mjs';

export async function eliminarPistaService(pistaId) {
  await eliminarPistaRepository(pistaId);
}
