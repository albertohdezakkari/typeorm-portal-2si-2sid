import { listarAsignacionesPorCosechaRepository } from './repository.mjs';

export function listarAsignacionesPorCosechaService(cosechaId) {
  return listarAsignacionesPorCosechaRepository(cosechaId);
}
