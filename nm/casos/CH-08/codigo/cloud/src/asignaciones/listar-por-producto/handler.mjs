import { listarAsignacionesPorProductoService } from './service.mjs';

export async function handler(event) {
  const productoId = Number(event.pathParameters.productoId);
  const asignaciones = await listarAsignacionesPorProductoService(productoId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
