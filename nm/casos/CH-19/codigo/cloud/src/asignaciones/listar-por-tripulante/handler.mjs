import { listarAsignacionesPorTripulanteService } from './service.mjs';

export async function handler(event) {
  const tripulanteId = Number(event.pathParameters.tripulanteId);
  const asignaciones = await listarAsignacionesPorTripulanteService(tripulanteId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
