import { listarAsignacionesPorProfesionalService } from './service.mjs';

export async function handler(event) {
  const profesionalId = Number(event.pathParameters.profesionalId);
  const asignaciones = await listarAsignacionesPorProfesionalService(profesionalId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
