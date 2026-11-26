import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const proyectoId = Number(event.pathParameters.proyectoId);
  const colaboradorId = Number(event.pathParameters.colaboradorId);
  await eliminarAsignacionService(proyectoId, colaboradorId);
  return { statusCode: 204, body: '' };
}
