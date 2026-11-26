import { listarAsignacionesPorVendedorService } from './service.mjs';

export async function handler(event) {
  const vendedorId = Number(event.pathParameters.vendedorId);
  const asignaciones = await listarAsignacionesPorVendedorService(vendedorId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
