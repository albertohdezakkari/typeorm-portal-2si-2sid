import { modificarCapacidadRepository } from './repository.mjs';

export function modificarCapacidadService(aulaId, capacidad) {
  return modificarCapacidadRepository(aulaId, capacidad);
}
