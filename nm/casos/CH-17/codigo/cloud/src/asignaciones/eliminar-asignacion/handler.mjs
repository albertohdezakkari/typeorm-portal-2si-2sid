import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const escenaId = Number(event.pathParameters.escenaId);
  const actorId = Number(event.pathParameters.actorId);
  await eliminarAsignacionService(escenaId, actorId);
  return { statusCode: 204, body: '' };
}
