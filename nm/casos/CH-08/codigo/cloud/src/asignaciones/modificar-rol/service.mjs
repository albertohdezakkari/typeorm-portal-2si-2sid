import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(productoId, panaderoId, rol) {
  return modificarRolRepository(productoId, panaderoId, rol);
}
