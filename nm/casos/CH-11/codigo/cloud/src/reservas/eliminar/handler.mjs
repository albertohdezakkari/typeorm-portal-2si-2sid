import { eliminarReservaService } from './service.mjs';

export async function handler(event) {
  const reservaId = Number(event.pathParameters.reservaId);
  await eliminarReservaService(reservaId);
  return { statusCode: 204 };
}
