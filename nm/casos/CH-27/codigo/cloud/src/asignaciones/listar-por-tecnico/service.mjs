import { listarAsignacionesPorTecnicoRepository } from './repository.mjs';

export function listarAsignacionesPorTecnicoService(tecnicoId) {
  return listarAsignacionesPorTecnicoRepository(tecnicoId);
}
