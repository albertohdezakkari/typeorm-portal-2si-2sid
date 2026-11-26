import { eliminarArticuloService } from './service.mjs';

export async function handler(event) {
  const articuloId = Number(event.pathParameters.articuloId);
  await eliminarArticuloService(articuloId);
  return { statusCode: 204 };
}
