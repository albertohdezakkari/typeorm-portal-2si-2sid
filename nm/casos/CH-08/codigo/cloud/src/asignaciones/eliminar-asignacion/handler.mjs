import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const productoId = Number(event.pathParameters.productoId);
  const panaderoId = Number(event.pathParameters.panaderoId);
  await eliminarAsignacionService(productoId, panaderoId);
  return { statusCode: 204, body: '' };
}
