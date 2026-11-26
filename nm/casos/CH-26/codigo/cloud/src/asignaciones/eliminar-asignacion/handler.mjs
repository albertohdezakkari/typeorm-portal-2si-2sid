import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const aulaId = Number(event.pathParameters.aulaId);
  const docenteId = Number(event.pathParameters.docenteId);
  await eliminarAsignacionService(aulaId, docenteId);
  return { statusCode: 204, body: '' };
}
