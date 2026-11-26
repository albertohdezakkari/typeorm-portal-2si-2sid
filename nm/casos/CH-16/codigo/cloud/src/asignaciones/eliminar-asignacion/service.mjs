import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(articuloId, vendedorId) {
  return eliminarAsignacionRepository(articuloId, vendedorId);
}
