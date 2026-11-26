import { listarAsignacionesPorTecnicoService } from './service.mjs';

export async function handler(event) {
  const tecnicoId = Number(event.pathParameters.tecnicoId);
  const asignaciones = await listarAsignacionesPorTecnicoService(tecnicoId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
