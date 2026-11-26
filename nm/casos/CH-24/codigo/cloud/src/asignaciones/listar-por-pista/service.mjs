import { listarAsignacionesPorPistaRepository } from './repository.mjs';

export function listarAsignacionesPorPistaService(pistaId) {
  return listarAsignacionesPorPistaRepository(pistaId);
}
