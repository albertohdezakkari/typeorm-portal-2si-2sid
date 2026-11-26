import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const articuloId = Number(event.pathParameters.articuloId);
  const vendedorId = Number(event.pathParameters.vendedorId);
  await eliminarAsignacionService(articuloId, vendedorId);
  return { statusCode: 204, body: '' };
}
