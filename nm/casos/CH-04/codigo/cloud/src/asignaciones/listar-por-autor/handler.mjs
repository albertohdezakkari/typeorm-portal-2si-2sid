import { listarAsignacionesPorAutorService } from './service.mjs';

export async function handler(event) {
  const autorId = Number(event.pathParameters.autorId);
  const asignaciones = await listarAsignacionesPorAutorService(autorId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
