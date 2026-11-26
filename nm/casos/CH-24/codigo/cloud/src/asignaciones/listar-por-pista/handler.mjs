import { listarAsignacionesPorPistaService } from './service.mjs';

export async function handler(event) {
  const pistaId = Number(event.pathParameters.pistaId);
  const asignaciones = await listarAsignacionesPorPistaService(pistaId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
