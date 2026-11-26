import { eliminarAnimalService } from './service.mjs';

export async function handler(event) {
  const animalId = Number(event.pathParameters.animalId);
  await eliminarAnimalService(animalId);
  return { statusCode: 204 };
}
