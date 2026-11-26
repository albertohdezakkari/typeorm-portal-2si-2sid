import { listarAsignacionesPorExcursionService } from './service.mjs';

export async function handler(event) {
  const excursionId = Number(event.pathParameters.excursionId);
  const asignaciones = await listarAsignacionesPorExcursionService(excursionId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
