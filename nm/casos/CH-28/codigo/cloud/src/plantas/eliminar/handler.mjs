import { eliminarPlantaService } from './service.mjs';

export async function handler(event) {
  const plantaId = Number(event.pathParameters.plantaId);
  await eliminarPlantaService(plantaId);
  return { statusCode: 204 };
}
