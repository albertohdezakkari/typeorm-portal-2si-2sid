import { listarAsignacionesPorEscenaService } from './service.mjs';

export async function handler(event) {
  const escenaId = Number(event.pathParameters.escenaId);
  const asignaciones = await listarAsignacionesPorEscenaService(escenaId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
