import { listarAsignacionesPorAnalistaRepository } from './repository.mjs';

export function listarAsignacionesPorAnalistaService(analistaId) {
  return listarAsignacionesPorAnalistaRepository(analistaId);
}
