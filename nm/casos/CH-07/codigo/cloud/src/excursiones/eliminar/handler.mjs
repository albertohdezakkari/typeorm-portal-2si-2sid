import { eliminarExcursionService } from './service.mjs';

export async function handler(event) {
  const excursionId = Number(event.pathParameters.excursionId);
  await eliminarExcursionService(excursionId);
  return { statusCode: 204 };
}
