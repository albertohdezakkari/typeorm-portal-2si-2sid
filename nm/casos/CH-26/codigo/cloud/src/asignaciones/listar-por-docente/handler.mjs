import { listarAsignacionesPorDocenteService } from './service.mjs';

export async function handler(event) {
  const docenteId = Number(event.pathParameters.docenteId);
  const asignaciones = await listarAsignacionesPorDocenteService(docenteId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
