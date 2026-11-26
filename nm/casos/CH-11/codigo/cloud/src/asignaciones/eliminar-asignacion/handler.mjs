import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const reservaId = Number(event.pathParameters.reservaId);
  const huespedId = Number(event.pathParameters.huespedId);
  await eliminarAsignacionService(reservaId, huespedId);
  return { statusCode: 204, body: '' };
}
