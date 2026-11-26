import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const parcelaId = Number(event.pathParameters.parcelaId);
  const cultivadorId = Number(event.pathParameters.cultivadorId);
  await eliminarAsignacionService(parcelaId, cultivadorId);
  return { statusCode: 204, body: '' };
}
