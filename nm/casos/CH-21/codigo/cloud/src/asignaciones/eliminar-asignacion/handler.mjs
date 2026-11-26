import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const muestraId = Number(event.pathParameters.muestraId);
  const analistaId = Number(event.pathParameters.analistaId);
  await eliminarAsignacionService(muestraId, analistaId);
  return { statusCode: 204, body: '' };
}
