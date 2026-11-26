import { consultarFestivalService } from './service.mjs';

export async function handler(event) {
  const festivalId = Number(event.pathParameters.festivalId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarFestivalService(festivalId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
