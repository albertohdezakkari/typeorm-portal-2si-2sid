import { modificarNochesService } from './service.mjs';

export async function handler(event) {
  const reservaId = Number(event.pathParameters.reservaId);
  const { noches } = JSON.parse(event.body);
  const resultado = await modificarNochesService(reservaId, noches);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
