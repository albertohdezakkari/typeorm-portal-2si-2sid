import { consultarHotelService } from './service.mjs';

export async function handler(event) {
  const hotelId = Number(event.pathParameters.hotelId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarHotelService(hotelId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
