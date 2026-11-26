import { crearReservaRepository, listarReservasRepository } from './repository.mjs';

export async function crearReservaService(nombre, noches, hotelId) {
  const reservaId = Date.now();
  const reserva = { reservaId, nombre, noches, hotelId };
  await crearReservaRepository(reserva);
  return reserva;
}

export function listarReservasService() {
  return listarReservasRepository();
}
