import { eliminarZonaRepository } from './repository.mjs';

export async function eliminarZonaService(zonaId) {
  await eliminarZonaRepository(zonaId);
}
