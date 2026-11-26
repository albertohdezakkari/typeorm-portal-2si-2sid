import { consultarCooperativaService } from './service.mjs';

export async function handler(event) {
  const cooperativaId = Number(event.pathParameters.cooperativaId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarCooperativaService(cooperativaId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
