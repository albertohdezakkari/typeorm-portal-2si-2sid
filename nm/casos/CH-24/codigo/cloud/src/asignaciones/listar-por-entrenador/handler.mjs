import { listarAsignacionesPorEntrenadorService } from './service.mjs';

export async function handler(event) {
  const entrenadorId = Number(event.pathParameters.entrenadorId);
  const asignaciones = await listarAsignacionesPorEntrenadorService(entrenadorId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
