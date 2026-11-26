import { listarAsignacionesPorCosechaService } from './service.mjs';

export async function handler(event) {
  const cosechaId = Number(event.pathParameters.cosechaId);
  const asignaciones = await listarAsignacionesPorCosechaService(cosechaId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
