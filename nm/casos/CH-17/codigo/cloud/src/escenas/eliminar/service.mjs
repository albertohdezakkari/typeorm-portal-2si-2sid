import { eliminarEscenaRepository } from './repository.mjs';

export async function eliminarEscenaService(escenaId) {
  await eliminarEscenaRepository(escenaId);
}
