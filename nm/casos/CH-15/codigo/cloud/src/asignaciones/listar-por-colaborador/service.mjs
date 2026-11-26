import { listarAsignacionesPorColaboradorRepository } from './repository.mjs';

export function listarAsignacionesPorColaboradorService(colaboradorId) {
  return listarAsignacionesPorColaboradorRepository(colaboradorId);
}
