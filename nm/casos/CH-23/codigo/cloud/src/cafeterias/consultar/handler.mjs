import { consultarCafeteriaService } from './service.mjs';

export async function handler(event) {
  const cafeteriaId = Number(event.pathParameters.cafeteriaId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarCafeteriaService(cafeteriaId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
