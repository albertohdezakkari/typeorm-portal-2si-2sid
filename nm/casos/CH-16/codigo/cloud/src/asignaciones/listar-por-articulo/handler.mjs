import { listarAsignacionesPorArticuloService } from './service.mjs';

export async function handler(event) {
  const articuloId = Number(event.pathParameters.articuloId);
  const asignaciones = await listarAsignacionesPorArticuloService(articuloId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
