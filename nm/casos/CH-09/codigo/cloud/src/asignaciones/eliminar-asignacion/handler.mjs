import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const reparacionId = Number(event.pathParameters.reparacionId);
  const mecanicoId = Number(event.pathParameters.mecanicoId);
  await eliminarAsignacionService(reparacionId, mecanicoId);
  return { statusCode: 204, body: '' };
}
