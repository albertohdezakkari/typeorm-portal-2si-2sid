import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(loteId, inspectorId, rol) {
  return modificarRolRepository(loteId, inspectorId, rol);
}
