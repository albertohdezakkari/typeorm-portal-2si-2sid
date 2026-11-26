import { listarAsignacionesPorConductorService } from './service.mjs';

export async function handler(event) {
  const conductorId = Number(event.pathParameters.conductorId);
  const asignaciones = await listarAsignacionesPorConductorService(conductorId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
