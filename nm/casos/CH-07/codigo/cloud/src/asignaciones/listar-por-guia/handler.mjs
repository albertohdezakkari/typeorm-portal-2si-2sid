import { listarAsignacionesPorGuiaService } from './service.mjs';

export async function handler(event) {
  const guiaId = Number(event.pathParameters.guiaId);
  const asignaciones = await listarAsignacionesPorGuiaService(guiaId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
