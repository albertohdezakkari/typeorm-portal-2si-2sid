import { consultarPanaderiaService } from './service.mjs';

export async function handler(event) {
  const panaderiaId = Number(event.pathParameters.panaderiaId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarPanaderiaService(panaderiaId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
