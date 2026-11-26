import { consultarEmisoraService } from './service.mjs';

export async function handler(event) {
  const emisoraId = Number(event.pathParameters.emisoraId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarEmisoraService(emisoraId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
