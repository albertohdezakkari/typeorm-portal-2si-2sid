import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const excursionId = Number(event.pathParameters.excursionId);
  const guiaId = Number(event.pathParameters.guiaId);
  await eliminarAsignacionService(excursionId, guiaId);
  return { statusCode: 204, body: '' };
}
