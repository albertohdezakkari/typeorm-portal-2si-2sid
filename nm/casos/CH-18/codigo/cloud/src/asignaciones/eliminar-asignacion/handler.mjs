import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const actividadId = Number(event.pathParameters.actividadId);
  const monitorId = Number(event.pathParameters.monitorId);
  await eliminarAsignacionService(actividadId, monitorId);
  return { statusCode: 204, body: '' };
}
