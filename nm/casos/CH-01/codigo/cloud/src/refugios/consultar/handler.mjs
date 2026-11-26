import { consultarRefugioService } from './service.mjs';

export async function handler(event) {
  const refugioId = Number(event.pathParameters.refugioId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarRefugioService(refugioId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
