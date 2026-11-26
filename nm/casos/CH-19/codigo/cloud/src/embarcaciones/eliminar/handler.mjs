import { eliminarEmbarcacionService } from './service.mjs';

export async function handler(event) {
  const embarcacionId = Number(event.pathParameters.embarcacionId);
  await eliminarEmbarcacionService(embarcacionId);
  return { statusCode: 204 };
}
