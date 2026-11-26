import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const publicacionId = Number(event.pathParameters.publicacionId);
  const autorId = Number(event.pathParameters.autorId);
  await eliminarAsignacionService(publicacionId, autorId);
  return { statusCode: 204, body: '' };
}
