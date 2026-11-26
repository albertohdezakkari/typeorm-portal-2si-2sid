import { consultarTeatroService } from './service.mjs';

export async function handler(event) {
  const teatroId = Number(event.pathParameters.teatroId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarTeatroService(teatroId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
