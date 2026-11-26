import { listarAsignacionesPorParcelaService } from './service.mjs';

export async function handler(event) {
  const parcelaId = Number(event.pathParameters.parcelaId);
  const asignaciones = await listarAsignacionesPorParcelaService(parcelaId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
