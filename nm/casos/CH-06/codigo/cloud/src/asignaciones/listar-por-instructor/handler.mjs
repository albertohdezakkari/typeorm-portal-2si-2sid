import { listarAsignacionesPorInstructorService } from './service.mjs';

export async function handler(event) {
  const instructorId = Number(event.pathParameters.instructorId);
  const asignaciones = await listarAsignacionesPorInstructorService(instructorId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
