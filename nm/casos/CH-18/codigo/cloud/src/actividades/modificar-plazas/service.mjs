import { modificarPlazasRepository } from './repository.mjs';

export function modificarPlazasService(actividadId, plazas) {
  return modificarPlazasRepository(actividadId, plazas);
}
