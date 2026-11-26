import { listarAsignacionesPorTrayectoService } from './service.mjs';

export async function handler(event) {
  const trayectoId = Number(event.pathParameters.trayectoId);
  const asignaciones = await listarAsignacionesPorTrayectoService(trayectoId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
