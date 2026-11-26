import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(productoId, panaderoId) {
  return eliminarAsignacionRepository(productoId, panaderoId);
}
