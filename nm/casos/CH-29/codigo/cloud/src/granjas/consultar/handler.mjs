import { consultarGranjaService } from './service.mjs';

export async function handler(event) {
  const granjaId = Number(event.pathParameters.granjaId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarGranjaService(granjaId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
