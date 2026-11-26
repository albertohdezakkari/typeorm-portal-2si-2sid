import { consultarPuertoService } from './service.mjs';

export async function handler(event) {
  const puertoId = Number(event.pathParameters.puertoId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarPuertoService(puertoId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
