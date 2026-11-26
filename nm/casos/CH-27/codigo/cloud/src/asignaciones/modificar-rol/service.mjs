import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(plazaId, tecnicoId, rol) {
  return modificarRolRepository(plazaId, tecnicoId, rol);
}
