import { consultarMuseoService } from './service.mjs';

export async function handler(event) {
  const museoId = Number(event.pathParameters.museoId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarMuseoService(museoId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
