import { listarAsignacionesPorActuacionService } from './service.mjs';

export async function handler(event) {
  const actuacionId = Number(event.pathParameters.actuacionId);
  const asignaciones = await listarAsignacionesPorActuacionService(actuacionId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
