import { listarAsignacionesPorReparacionService } from './service.mjs';

export async function handler(event) {
  const reparacionId = Number(event.pathParameters.reparacionId);
  const asignaciones = await listarAsignacionesPorReparacionService(reparacionId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
