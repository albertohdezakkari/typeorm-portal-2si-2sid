import { listarAsignacionesPorPlantaService } from './service.mjs';

export async function handler(event) {
  const plantaId = Number(event.pathParameters.plantaId);
  const asignaciones = await listarAsignacionesPorPlantaService(plantaId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
