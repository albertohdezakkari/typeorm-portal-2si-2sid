import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(trayectoId, conductorId, rol) {
  return modificarRolRepository(trayectoId, conductorId, rol);
}
