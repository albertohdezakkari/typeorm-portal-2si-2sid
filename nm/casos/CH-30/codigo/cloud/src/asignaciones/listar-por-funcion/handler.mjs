import { listarAsignacionesPorFuncionService } from './service.mjs';

export async function handler(event) {
  const funcionId = Number(event.pathParameters.funcionId);
  const asignaciones = await listarAsignacionesPorFuncionService(funcionId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
