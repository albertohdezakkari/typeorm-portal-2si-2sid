import { listarAsignacionesPorExcursionRepository } from './repository.mjs';

export function listarAsignacionesPorExcursionService(excursionId) {
  return listarAsignacionesPorExcursionRepository(excursionId);
}
