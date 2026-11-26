import { eliminarZonaService } from './service.mjs';

export async function handler(event) {
  const zonaId = Number(event.pathParameters.zonaId);
  await eliminarZonaService(zonaId);
  return { statusCode: 204 };
}
