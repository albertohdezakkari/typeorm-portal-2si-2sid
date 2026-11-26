import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const habitacionId = Number(event.pathParameters.habitacionId);
  const enfermeroId = Number(event.pathParameters.enfermeroId);
  await eliminarAsignacionService(habitacionId, enfermeroId);
  return { statusCode: 204, body: '' };
}
