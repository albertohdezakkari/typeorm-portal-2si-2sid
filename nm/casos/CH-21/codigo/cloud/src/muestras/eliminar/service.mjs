import { eliminarMuestraRepository } from './repository.mjs';

export async function eliminarMuestraService(muestraId) {
  await eliminarMuestraRepository(muestraId);
}
