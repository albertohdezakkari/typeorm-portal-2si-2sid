import { listarAsignacionesPorComandaService } from './service.mjs';

export async function handler(event) {
  const comandaId = Number(event.pathParameters.comandaId);
  const asignaciones = await listarAsignacionesPorComandaService(comandaId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
