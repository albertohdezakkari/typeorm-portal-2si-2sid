import { listarAsignacionesPorProgramaService } from './service.mjs';

export async function handler(event) {
  const programaId = Number(event.pathParameters.programaId);
  const asignaciones = await listarAsignacionesPorProgramaService(programaId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
