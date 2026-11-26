import { listarAsignacionesPorEnfermeroService } from './service.mjs';

export async function handler(event) {
  const enfermeroId = Number(event.pathParameters.enfermeroId);
  const asignaciones = await listarAsignacionesPorEnfermeroService(enfermeroId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
