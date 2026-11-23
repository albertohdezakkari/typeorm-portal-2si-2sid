import { listarAsignacionesPorProfesionalRepository } from './repository.mjs';

export function listarAsignacionesPorProfesionalService(profesionalId) {
  return listarAsignacionesPorProfesionalRepository(profesionalId);
}
