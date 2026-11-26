import { listarAsignacionesPorSesionService } from './service.mjs';

export async function handler(event) {
  const sesionId = Number(event.pathParameters.sesionId);
  const asignaciones = await listarAsignacionesPorSesionService(sesionId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
