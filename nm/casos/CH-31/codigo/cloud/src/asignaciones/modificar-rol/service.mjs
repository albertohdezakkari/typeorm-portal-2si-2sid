import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(documentoId, revisorId, rol) {
  return modificarRolRepository(documentoId, revisorId, rol);
}
