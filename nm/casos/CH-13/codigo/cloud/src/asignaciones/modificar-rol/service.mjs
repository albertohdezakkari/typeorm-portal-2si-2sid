import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(proyeccionId, tecnicoId, rol) {
  return modificarRolRepository(proyeccionId, tecnicoId, rol);
}
