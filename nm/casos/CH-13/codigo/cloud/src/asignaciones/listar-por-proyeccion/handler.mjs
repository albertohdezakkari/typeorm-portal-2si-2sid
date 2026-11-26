import { listarAsignacionesPorProyeccionService } from './service.mjs';

export async function handler(event) {
  const proyeccionId = Number(event.pathParameters.proyeccionId);
  const asignaciones = await listarAsignacionesPorProyeccionService(proyeccionId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
