import { buscarReservaRepository, buscarHuespedRepository, asignarHuespedRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarHuespedService(reservaId, huespedId, rol) {
  const reserva = await buscarReservaRepository(reservaId);
  const huesped = await buscarHuespedRepository(huespedId);
  if (!reserva || !huesped) {
    throw new ReferenciaInexistenteError('No existe la reserva o el huesped');
  }
  return asignarHuespedRepository(reservaId, huespedId, rol);
}
