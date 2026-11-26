import { modificarPlazasRepository } from './repository.mjs';

export function modificarPlazasService(sesionId, plazas) {
  return modificarPlazasRepository(sesionId, plazas);
}
