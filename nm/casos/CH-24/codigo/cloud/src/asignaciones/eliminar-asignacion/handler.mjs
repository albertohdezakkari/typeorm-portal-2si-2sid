import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const pistaId = Number(event.pathParameters.pistaId);
  const entrenadorId = Number(event.pathParameters.entrenadorId);
  await eliminarAsignacionService(pistaId, entrenadorId);
  return { statusCode: 204, body: '' };
}
