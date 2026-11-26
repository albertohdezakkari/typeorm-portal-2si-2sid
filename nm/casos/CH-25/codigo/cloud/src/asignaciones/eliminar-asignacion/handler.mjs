import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const programaId = Number(event.pathParameters.programaId);
  const locutorId = Number(event.pathParameters.locutorId);
  await eliminarAsignacionService(programaId, locutorId);
  return { statusCode: 204, body: '' };
}
