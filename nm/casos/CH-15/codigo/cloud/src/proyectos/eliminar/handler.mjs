import { eliminarProyectoService } from './service.mjs';

export async function handler(event) {
  const proyectoId = Number(event.pathParameters.proyectoId);
  await eliminarProyectoService(proyectoId);
  return { statusCode: 204 };
}
