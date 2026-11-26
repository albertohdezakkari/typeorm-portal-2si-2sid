import { listarAsignacionesPorLoteRepository } from './repository.mjs';

export function listarAsignacionesPorLoteService(loteId) {
  return listarAsignacionesPorLoteRepository(loteId);
}
