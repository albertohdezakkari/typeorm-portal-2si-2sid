import { listarAsignacionesPorPiezaService } from './service.mjs';

export async function handler(event) {
  const piezaId = Number(event.pathParameters.piezaId);
  const asignaciones = await listarAsignacionesPorPiezaService(piezaId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
