import { listarAsignacionesPorCocineroService } from './service.mjs';

export async function handler(event) {
  const cocineroId = Number(event.pathParameters.cocineroId);
  const asignaciones = await listarAsignacionesPorCocineroService(cocineroId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
