import { consultarEstudioService } from './service.mjs';

export async function handler(event) {
  const estudioId = Number(event.pathParameters.estudioId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarEstudioService(estudioId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
