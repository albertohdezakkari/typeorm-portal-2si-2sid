import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const zonaId = Number(event.pathParameters.zonaId);
  const jardineroId = Number(event.pathParameters.jardineroId);
  await eliminarAsignacionService(zonaId, jardineroId);
  return { statusCode: 204, body: '' };
}
