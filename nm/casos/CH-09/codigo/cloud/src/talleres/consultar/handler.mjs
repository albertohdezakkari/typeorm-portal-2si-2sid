import { consultarTallerService } from './service.mjs';

export async function handler(event) {
  const tallerId = Number(event.pathParameters.tallerId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarTallerService(tallerId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
