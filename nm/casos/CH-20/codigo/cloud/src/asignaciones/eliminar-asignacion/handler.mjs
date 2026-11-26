import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const trayectoId = Number(event.pathParameters.trayectoId);
  const conductorId = Number(event.pathParameters.conductorId);
  await eliminarAsignacionService(trayectoId, conductorId);
  return { statusCode: 204, body: '' };
}
