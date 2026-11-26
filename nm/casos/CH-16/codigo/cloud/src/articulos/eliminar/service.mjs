import { eliminarArticuloRepository } from './repository.mjs';

export async function eliminarArticuloService(articuloId) {
  await eliminarArticuloRepository(articuloId);
}
