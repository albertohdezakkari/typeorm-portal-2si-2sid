import { listarAsignacionesPorMuestraService } from './service.mjs';

export async function handler(event) {
  const muestraId = Number(event.pathParameters.muestraId);
  const asignaciones = await listarAsignacionesPorMuestraService(muestraId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
