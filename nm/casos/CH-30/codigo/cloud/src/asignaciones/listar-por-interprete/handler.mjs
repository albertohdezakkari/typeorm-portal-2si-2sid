import { listarAsignacionesPorInterpreteService } from './service.mjs';

export async function handler(event) {
  const interpreteId = Number(event.pathParameters.interpreteId);
  const asignaciones = await listarAsignacionesPorInterpreteService(interpreteId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
