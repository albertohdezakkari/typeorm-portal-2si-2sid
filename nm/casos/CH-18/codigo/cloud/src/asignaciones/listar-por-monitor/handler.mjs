import { listarAsignacionesPorMonitorService } from './service.mjs';

export async function handler(event) {
  const monitorId = Number(event.pathParameters.monitorId);
  const asignaciones = await listarAsignacionesPorMonitorService(monitorId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
