import { consultarParqueService } from './service.mjs';

export async function handler(event) {
  const parqueId = Number(event.pathParameters.parqueId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarParqueService(parqueId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
