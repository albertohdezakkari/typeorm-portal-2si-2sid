import { listarAsignacionesPorObraRepository } from './repository.mjs';

export function listarAsignacionesPorObraService(obraId) {
  return listarAsignacionesPorObraRepository(obraId);
}
