import { listarAsignacionesPorProductoRepository } from './repository.mjs';

export function listarAsignacionesPorProductoService(productoId) {
  return listarAsignacionesPorProductoRepository(productoId);
}
