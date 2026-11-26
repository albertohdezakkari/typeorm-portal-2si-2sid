import { listarAsignacionesPorDocenteRepository } from './repository.mjs';

export function listarAsignacionesPorDocenteService(docenteId) {
  return listarAsignacionesPorDocenteRepository(docenteId);
}
