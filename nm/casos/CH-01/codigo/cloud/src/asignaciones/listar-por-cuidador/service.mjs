import { listarAsignacionesPorCuidadorRepository } from './repository.mjs';

export function listarAsignacionesPorCuidadorService(cuidadorId) {
  return listarAsignacionesPorCuidadorRepository(cuidadorId);
}
