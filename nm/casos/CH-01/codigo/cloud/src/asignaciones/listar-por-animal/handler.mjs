import { listarAsignacionesPorAnimalService } from './service.mjs';

export async function handler(event) {
  const animalId = Number(event.pathParameters.animalId);
  const asignaciones = await listarAsignacionesPorAnimalService(animalId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
