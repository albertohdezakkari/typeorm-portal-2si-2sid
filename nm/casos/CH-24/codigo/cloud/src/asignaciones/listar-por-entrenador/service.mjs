import { listarAsignacionesPorEntrenadorRepository } from './repository.mjs';

export function listarAsignacionesPorEntrenadorService(entrenadorId) {
  return listarAsignacionesPorEntrenadorRepository(entrenadorId);
}
