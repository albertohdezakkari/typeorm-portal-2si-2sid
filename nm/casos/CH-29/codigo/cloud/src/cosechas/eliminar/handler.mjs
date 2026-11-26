import { eliminarCosechaService } from './service.mjs';

export async function handler(event) {
  const cosechaId = Number(event.pathParameters.cosechaId);
  await eliminarCosechaService(cosechaId);
  return { statusCode: 204 };
}
