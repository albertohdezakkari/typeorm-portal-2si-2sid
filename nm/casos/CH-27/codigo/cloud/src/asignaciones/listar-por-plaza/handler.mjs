import { listarAsignacionesPorPlazaService } from './service.mjs';

export async function handler(event) {
  const plazaId = Number(event.pathParameters.plazaId);
  const asignaciones = await listarAsignacionesPorPlazaService(plazaId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
