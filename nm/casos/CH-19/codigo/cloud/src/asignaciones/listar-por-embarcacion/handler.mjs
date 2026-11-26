import { listarAsignacionesPorEmbarcacionService } from './service.mjs';

export async function handler(event) {
  const embarcacionId = Number(event.pathParameters.embarcacionId);
  const asignaciones = await listarAsignacionesPorEmbarcacionService(embarcacionId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
