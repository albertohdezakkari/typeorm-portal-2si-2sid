import { consultarAyuntamientoService } from './service.mjs';

export async function handler(event) {
  const ayuntamientoId = Number(event.pathParameters.ayuntamientoId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarAyuntamientoService(ayuntamientoId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
