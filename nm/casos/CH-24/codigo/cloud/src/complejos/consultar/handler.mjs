import { consultarComplejoService } from './service.mjs';

export async function handler(event) {
  const complejoId = Number(event.pathParameters.complejoId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarComplejoService(complejoId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
