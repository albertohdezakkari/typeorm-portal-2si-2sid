import { consultarHuertoService } from './service.mjs';

export async function handler(event) {
  const huertoId = Number(event.pathParameters.huertoId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarHuertoService(huertoId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
