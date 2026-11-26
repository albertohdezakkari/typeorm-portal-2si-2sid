import { listarAsignacionesPorEscenaRepository } from './repository.mjs';

export function listarAsignacionesPorEscenaService(escenaId) {
  return listarAsignacionesPorEscenaRepository(escenaId);
}
