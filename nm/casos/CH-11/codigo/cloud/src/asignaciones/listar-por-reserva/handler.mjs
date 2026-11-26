import { listarAsignacionesPorReservaService } from './service.mjs';

export async function handler(event) {
  const reservaId = Number(event.pathParameters.reservaId);
  const asignaciones = await listarAsignacionesPorReservaService(reservaId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
