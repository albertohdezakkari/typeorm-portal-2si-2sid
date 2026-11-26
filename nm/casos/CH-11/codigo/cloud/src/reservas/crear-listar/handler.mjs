import { crearReservaService, listarReservasService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, noches, hotelId } = JSON.parse(event.body);
  const reserva = await crearReservaService(nombre, noches, hotelId);
  return { statusCode: 201, body: JSON.stringify(reserva) };
}

export async function listarHandler() {
  const reservas = await listarReservasService();
  return { statusCode: 200, body: JSON.stringify(reservas) };
}
