import { eliminarReservaRepository } from './repository.mjs';

export async function eliminarReservaService(reservaId) {
  await eliminarReservaRepository(reservaId);
}
