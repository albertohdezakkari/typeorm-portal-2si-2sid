import { listarAsignacionesPorEmbarcacionRepository } from './repository.mjs';

export function listarAsignacionesPorEmbarcacionService(embarcacionId) {
  return listarAsignacionesPorEmbarcacionRepository(embarcacionId);
}
