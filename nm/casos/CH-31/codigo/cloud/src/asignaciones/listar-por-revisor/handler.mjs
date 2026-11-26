import { listarAsignacionesPorRevisorService } from './service.mjs';

export async function handler(event) {
  const revisorId = Number(event.pathParameters.revisorId);
  const asignaciones = await listarAsignacionesPorRevisorService(revisorId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
