import { consultarEscuelaService } from './service.mjs';

export async function handler(event) {
  const escuelaId = Number(event.pathParameters.escuelaId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarEscuelaService(escuelaId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
