import { listarAsignacionesPorActividadService } from './service.mjs';

export async function handler(event) {
  const actividadId = Number(event.pathParameters.actividadId);
  const asignaciones = await listarAsignacionesPorActividadService(actividadId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
