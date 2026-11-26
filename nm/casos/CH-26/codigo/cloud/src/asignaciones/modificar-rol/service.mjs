import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(aulaId, docenteId, rol) {
  return modificarRolRepository(aulaId, docenteId, rol);
}
