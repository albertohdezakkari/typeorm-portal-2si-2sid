import { consultarViveroService } from './service.mjs';

export async function handler(event) {
  const viveroId = Number(event.pathParameters.viveroId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarViveroService(viveroId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
