import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(articuloId, vendedorId, rol) {
  return modificarRolRepository(articuloId, vendedorId, rol);
}
