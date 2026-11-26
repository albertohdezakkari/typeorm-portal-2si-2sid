import { listarAsignacionesPorInspectorService } from './service.mjs';

export async function handler(event) {
  const inspectorId = Number(event.pathParameters.inspectorId);
  const asignaciones = await listarAsignacionesPorInspectorService(inspectorId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
