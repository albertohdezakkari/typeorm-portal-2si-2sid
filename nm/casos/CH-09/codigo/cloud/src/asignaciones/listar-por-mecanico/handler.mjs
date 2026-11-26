import { listarAsignacionesPorMecanicoService } from './service.mjs';

export async function handler(event) {
  const mecanicoId = Number(event.pathParameters.mecanicoId);
  const asignaciones = await listarAsignacionesPorMecanicoService(mecanicoId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
