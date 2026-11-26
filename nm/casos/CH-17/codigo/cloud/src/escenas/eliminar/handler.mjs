import { eliminarEscenaService } from './service.mjs';

export async function handler(event) {
  const escenaId = Number(event.pathParameters.escenaId);
  await eliminarEscenaService(escenaId);
  return { statusCode: 204 };
}
