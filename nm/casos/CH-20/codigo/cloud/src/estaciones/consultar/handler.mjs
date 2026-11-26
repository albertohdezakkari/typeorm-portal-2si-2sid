import { consultarEstacionService } from './service.mjs';

export async function handler(event) {
  const estacionId = Number(event.pathParameters.estacionId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarEstacionService(estacionId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
