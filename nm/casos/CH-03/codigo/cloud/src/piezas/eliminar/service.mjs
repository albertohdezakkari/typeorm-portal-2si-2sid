import { eliminarPiezaRepository } from './repository.mjs';

export async function eliminarPiezaService(piezaId) {
  await eliminarPiezaRepository(piezaId);
}
