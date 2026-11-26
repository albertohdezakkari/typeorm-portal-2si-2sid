import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const actuacionId = Number(event.pathParameters.actuacionId);
  const artistaId = Number(event.pathParameters.artistaId);
  await eliminarAsignacionService(actuacionId, artistaId);
  return { statusCode: 204, body: '' };
}
