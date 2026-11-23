import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const obraId = Number(event.pathParameters.obraId);
  const profesionalId = Number(event.pathParameters.profesionalId);
  await eliminarAsignacionService(obraId, profesionalId);
  return { statusCode: 204, body: '' };
}
