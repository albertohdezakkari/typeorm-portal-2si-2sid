import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(reservaId, huespedId, rol) {
  return modificarRolRepository(reservaId, huespedId, rol);
}
