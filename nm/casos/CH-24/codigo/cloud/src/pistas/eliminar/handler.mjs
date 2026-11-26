import { eliminarPistaService } from './service.mjs';

export async function handler(event) {
  const pistaId = Number(event.pathParameters.pistaId);
  await eliminarPistaService(pistaId);
  return { statusCode: 204 };
}
