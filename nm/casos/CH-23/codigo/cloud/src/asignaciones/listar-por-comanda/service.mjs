import { listarAsignacionesPorComandaRepository } from './repository.mjs';

export function listarAsignacionesPorComandaService(comandaId) {
  return listarAsignacionesPorComandaRepository(comandaId);
}
