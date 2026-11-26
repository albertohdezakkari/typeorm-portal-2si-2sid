import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const piezaId = Number(event.pathParameters.piezaId);
  const restauradorId = Number(event.pathParameters.restauradorId);
  await eliminarAsignacionService(piezaId, restauradorId);
  return { statusCode: 204, body: '' };
}
