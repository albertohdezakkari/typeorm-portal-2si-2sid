import { eliminarPlazaRepository } from './repository.mjs';

export async function eliminarPlazaService(plazaId) {
  await eliminarPlazaRepository(plazaId);
}
