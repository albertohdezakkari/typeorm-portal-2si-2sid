import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(proyectoId, colaboradorId, rol) {
  return modificarRolRepository(proyectoId, colaboradorId, rol);
}
