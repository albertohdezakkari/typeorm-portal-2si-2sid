import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const animalId = Number(event.pathParameters.animalId);
  const cuidadorId = Number(event.pathParameters.cuidadorId);
  await eliminarAsignacionService(animalId, cuidadorId);
  return { statusCode: 204, body: '' };
}
