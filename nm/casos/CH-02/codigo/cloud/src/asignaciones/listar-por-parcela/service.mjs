import { listarAsignacionesPorParcelaRepository } from './repository.mjs';

export function listarAsignacionesPorParcelaService(parcelaId) {
  return listarAsignacionesPorParcelaRepository(parcelaId);
}
