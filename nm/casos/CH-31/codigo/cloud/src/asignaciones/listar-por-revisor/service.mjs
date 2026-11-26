import { listarAsignacionesPorRevisorRepository } from './repository.mjs';

export function listarAsignacionesPorRevisorService(revisorId) {
  return listarAsignacionesPorRevisorRepository(revisorId);
}
