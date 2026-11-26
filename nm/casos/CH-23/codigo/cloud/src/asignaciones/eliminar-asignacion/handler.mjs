import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const comandaId = Number(event.pathParameters.comandaId);
  const cocineroId = Number(event.pathParameters.cocineroId);
  await eliminarAsignacionService(comandaId, cocineroId);
  return { statusCode: 204, body: '' };
}
