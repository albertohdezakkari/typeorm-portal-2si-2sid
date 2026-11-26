import { eliminarAulaService } from './service.mjs';

export async function handler(event) {
  const aulaId = Number(event.pathParameters.aulaId);
  await eliminarAulaService(aulaId);
  return { statusCode: 204 };
}
