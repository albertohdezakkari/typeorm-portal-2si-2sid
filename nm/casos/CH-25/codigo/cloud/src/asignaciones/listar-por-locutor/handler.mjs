import { listarAsignacionesPorLocutorService } from './service.mjs';

export async function handler(event) {
  const locutorId = Number(event.pathParameters.locutorId);
  const asignaciones = await listarAsignacionesPorLocutorService(locutorId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
