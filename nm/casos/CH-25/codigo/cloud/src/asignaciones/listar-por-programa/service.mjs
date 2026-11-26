import { listarAsignacionesPorProgramaRepository } from './repository.mjs';

export function listarAsignacionesPorProgramaService(programaId) {
  return listarAsignacionesPorProgramaRepository(programaId);
}
