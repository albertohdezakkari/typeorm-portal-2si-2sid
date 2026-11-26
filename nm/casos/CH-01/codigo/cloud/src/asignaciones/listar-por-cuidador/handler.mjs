import { listarAsignacionesPorCuidadorService } from './service.mjs';

export async function handler(event) {
  const cuidadorId = Number(event.pathParameters.cuidadorId);
  const asignaciones = await listarAsignacionesPorCuidadorService(cuidadorId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
