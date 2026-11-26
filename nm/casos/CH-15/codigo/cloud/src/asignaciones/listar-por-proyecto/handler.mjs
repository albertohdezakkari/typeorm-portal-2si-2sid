import { listarAsignacionesPorProyectoService } from './service.mjs';

export async function handler(event) {
  const proyectoId = Number(event.pathParameters.proyectoId);
  const asignaciones = await listarAsignacionesPorProyectoService(proyectoId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
