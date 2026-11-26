import { eliminarComandaRepository } from './repository.mjs';

export async function eliminarComandaService(comandaId) {
  await eliminarComandaRepository(comandaId);
}
