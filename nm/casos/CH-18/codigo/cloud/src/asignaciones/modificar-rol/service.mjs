import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(actividadId, monitorId, rol) {
  return modificarRolRepository(actividadId, monitorId, rol);
}
