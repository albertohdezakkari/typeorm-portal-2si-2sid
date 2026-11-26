import { modificarDistanciaKmRepository } from './repository.mjs';

export function modificarDistanciaKmService(trayectoId, distanciaKm) {
  return modificarDistanciaKmRepository(trayectoId, distanciaKm);
}
