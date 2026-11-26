import { listarAsignacionesPorAgricultorService } from './service.mjs';

export async function handler(event) {
  const agricultorId = Number(event.pathParameters.agricultorId);
  const asignaciones = await listarAsignacionesPorAgricultorService(agricultorId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
