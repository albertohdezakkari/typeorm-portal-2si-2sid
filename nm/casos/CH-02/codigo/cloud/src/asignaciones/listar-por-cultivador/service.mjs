import { listarAsignacionesPorCultivadorRepository } from './repository.mjs';

export function listarAsignacionesPorCultivadorService(cultivadorId) {
  return listarAsignacionesPorCultivadorRepository(cultivadorId);
}
