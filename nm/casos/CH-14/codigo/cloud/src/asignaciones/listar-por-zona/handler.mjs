import { listarAsignacionesPorZonaService } from './service.mjs';

export async function handler(event) {
  const zonaId = Number(event.pathParameters.zonaId);
  const asignaciones = await listarAsignacionesPorZonaService(zonaId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
