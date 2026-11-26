import { listarAsignacionesPorAnalistaService } from './service.mjs';

export async function handler(event) {
  const analistaId = Number(event.pathParameters.analistaId);
  const asignaciones = await listarAsignacionesPorAnalistaService(analistaId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
