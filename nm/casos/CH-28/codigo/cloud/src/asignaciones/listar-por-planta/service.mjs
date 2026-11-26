import { listarAsignacionesPorPlantaRepository } from './repository.mjs';

export function listarAsignacionesPorPlantaService(plantaId) {
  return listarAsignacionesPorPlantaRepository(plantaId);
}
