import { consultarUrbanizacionService } from './service.mjs';

export async function handler(event) {
  const urbanizacionId = Number(event.pathParameters.urbanizacionId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarUrbanizacionService(urbanizacionId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
