import { consultarCineService } from './service.mjs';

export async function handler(event) {
  const cineId = Number(event.pathParameters.cineId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarCineService(cineId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
