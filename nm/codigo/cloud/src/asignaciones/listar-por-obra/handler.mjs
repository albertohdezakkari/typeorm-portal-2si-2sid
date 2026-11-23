import { listarAsignacionesPorObraService } from './service.mjs';

export async function handler(event) {
  const obraId = Number(event.pathParameters.obraId);
  const asignaciones = await listarAsignacionesPorObraService(obraId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
