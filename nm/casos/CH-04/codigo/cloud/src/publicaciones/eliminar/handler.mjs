import { eliminarPublicacionService } from './service.mjs';

export async function handler(event) {
  const publicacionId = Number(event.pathParameters.publicacionId);
  await eliminarPublicacionService(publicacionId);
  return { statusCode: 204 };
}
