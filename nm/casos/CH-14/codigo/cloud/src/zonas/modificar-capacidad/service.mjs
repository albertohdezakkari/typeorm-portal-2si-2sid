import { modificarCapacidadRepository } from './repository.mjs';

export function modificarCapacidadService(zonaId, capacidad) {
  return modificarCapacidadRepository(zonaId, capacidad);
}
