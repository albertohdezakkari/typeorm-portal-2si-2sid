import { eliminarProyeccionService } from './service.mjs';

export async function handler(event) {
  const proyeccionId = Number(event.pathParameters.proyeccionId);
  await eliminarProyeccionService(proyeccionId);
  return { statusCode: 204 };
}
