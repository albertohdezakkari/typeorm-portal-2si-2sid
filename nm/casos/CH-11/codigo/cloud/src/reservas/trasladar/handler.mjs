import { trasladarReservaService } from './service.mjs';

export async function handler(event) {
  const reservaId = Number(event.pathParameters.reservaId);
  const { hotelId } = JSON.parse(event.body);
  const resultado = await trasladarReservaService(reservaId, hotelId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
