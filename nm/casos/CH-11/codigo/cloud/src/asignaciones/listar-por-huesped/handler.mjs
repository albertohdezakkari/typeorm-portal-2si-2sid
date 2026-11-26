import { listarAsignacionesPorHuespedService } from './service.mjs';

export async function handler(event) {
  const huespedId = Number(event.pathParameters.huespedId);
  const asignaciones = await listarAsignacionesPorHuespedService(huespedId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
