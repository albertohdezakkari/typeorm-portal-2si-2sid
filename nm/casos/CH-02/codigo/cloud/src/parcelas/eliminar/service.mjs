import { eliminarParcelaRepository } from './repository.mjs';

export async function eliminarParcelaService(parcelaId) {
  await eliminarParcelaRepository(parcelaId);
}
