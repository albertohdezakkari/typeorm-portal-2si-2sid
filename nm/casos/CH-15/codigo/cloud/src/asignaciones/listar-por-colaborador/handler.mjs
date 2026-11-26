import { listarAsignacionesPorColaboradorService } from './service.mjs';

export async function handler(event) {
  const colaboradorId = Number(event.pathParameters.colaboradorId);
  const asignaciones = await listarAsignacionesPorColaboradorService(colaboradorId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
