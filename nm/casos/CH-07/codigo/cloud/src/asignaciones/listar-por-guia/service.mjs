import { listarAsignacionesPorGuiaRepository } from './repository.mjs';

export function listarAsignacionesPorGuiaService(guiaId) {
  return listarAsignacionesPorGuiaRepository(guiaId);
}
