import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const cosechaId = Number(event.pathParameters.cosechaId);
  const agricultorId = Number(event.pathParameters.agricultorId);
  await eliminarAsignacionService(cosechaId, agricultorId);
  return { statusCode: 204, body: '' };
}
