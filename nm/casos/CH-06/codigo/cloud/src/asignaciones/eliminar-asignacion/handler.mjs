import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const sesionId = Number(event.pathParameters.sesionId);
  const instructorId = Number(event.pathParameters.instructorId);
  await eliminarAsignacionService(sesionId, instructorId);
  return { statusCode: 204, body: '' };
}
