import { listarAsignacionesPorFuncionRepository } from './repository.mjs';

export function listarAsignacionesPorFuncionService(funcionId) {
  return listarAsignacionesPorFuncionRepository(funcionId);
}
