import { listarAsignacionesPorLoteService } from './service.mjs';

export async function handler(event) {
  const loteId = Number(event.pathParameters.loteId);
  const asignaciones = await listarAsignacionesPorLoteService(loteId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
