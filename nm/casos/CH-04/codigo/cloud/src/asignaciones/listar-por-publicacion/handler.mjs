import { listarAsignacionesPorPublicacionService } from './service.mjs';

export async function handler(event) {
  const publicacionId = Number(event.pathParameters.publicacionId);
  const asignaciones = await listarAsignacionesPorPublicacionService(publicacionId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
