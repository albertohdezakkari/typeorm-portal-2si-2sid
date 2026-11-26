import { listarAsignacionesPorPanaderoService } from './service.mjs';

export async function handler(event) {
  const panaderoId = Number(event.pathParameters.panaderoId);
  const asignaciones = await listarAsignacionesPorPanaderoService(panaderoId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
