import { listarAsignacionesPorPiezaRepository } from './repository.mjs';

export function listarAsignacionesPorPiezaService(piezaId) {
  return listarAsignacionesPorPiezaRepository(piezaId);
}
