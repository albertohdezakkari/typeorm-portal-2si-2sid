import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(muestraId, analistaId, rol) {
  return modificarRolRepository(muestraId, analistaId, rol);
}
