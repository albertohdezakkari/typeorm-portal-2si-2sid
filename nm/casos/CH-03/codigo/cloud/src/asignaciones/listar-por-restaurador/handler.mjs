import { listarAsignacionesPorRestauradorService } from './service.mjs';

export async function handler(event) {
  const restauradorId = Number(event.pathParameters.restauradorId);
  const asignaciones = await listarAsignacionesPorRestauradorService(restauradorId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
