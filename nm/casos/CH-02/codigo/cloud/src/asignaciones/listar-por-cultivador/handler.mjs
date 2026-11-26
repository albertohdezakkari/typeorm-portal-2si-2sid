import { listarAsignacionesPorCultivadorService } from './service.mjs';

export async function handler(event) {
  const cultivadorId = Number(event.pathParameters.cultivadorId);
  const asignaciones = await listarAsignacionesPorCultivadorService(cultivadorId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
