import { listarAsignacionesPorAulaRepository } from './repository.mjs';

export function listarAsignacionesPorAulaService(aulaId) {
  return listarAsignacionesPorAulaRepository(aulaId);
}
