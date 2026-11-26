import { listarAsignacionesPorRestauradorRepository } from './repository.mjs';

export function listarAsignacionesPorRestauradorService(restauradorId) {
  return listarAsignacionesPorRestauradorRepository(restauradorId);
}
