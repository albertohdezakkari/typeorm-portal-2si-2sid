import { modificarAlturaCmRepository } from './repository.mjs';

export function modificarAlturaCmService(plantaId, alturaCm) {
  return modificarAlturaCmRepository(plantaId, alturaCm);
}
