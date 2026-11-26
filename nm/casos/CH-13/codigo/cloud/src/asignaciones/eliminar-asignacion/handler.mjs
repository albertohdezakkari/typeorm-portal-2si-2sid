import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const proyeccionId = Number(event.pathParameters.proyeccionId);
  const tecnicoId = Number(event.pathParameters.tecnicoId);
  await eliminarAsignacionService(proyeccionId, tecnicoId);
  return { statusCode: 204, body: '' };
}
