import { listarAsignacionesPorJardineroService } from './service.mjs';

export async function handler(event) {
  const jardineroId = Number(event.pathParameters.jardineroId);
  const asignaciones = await listarAsignacionesPorJardineroService(jardineroId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
