import { eliminarProductoService } from './service.mjs';

export async function handler(event) {
  const productoId = Number(event.pathParameters.productoId);
  await eliminarProductoService(productoId);
  return { statusCode: 204 };
}
