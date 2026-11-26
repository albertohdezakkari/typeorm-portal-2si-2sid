import { listarAsignacionesPorAulaService } from './service.mjs';

export async function handler(event) {
  const aulaId = Number(event.pathParameters.aulaId);
  const asignaciones = await listarAsignacionesPorAulaService(aulaId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
