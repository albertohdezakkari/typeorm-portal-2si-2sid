import { listarAsignacionesPorArtistaService } from './service.mjs';

export async function handler(event) {
  const artistaId = Number(event.pathParameters.artistaId);
  const asignaciones = await listarAsignacionesPorArtistaService(artistaId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
