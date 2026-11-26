import { listarAsignacionesPorInterpreteRepository } from './repository.mjs';

export function listarAsignacionesPorInterpreteService(interpreteId) {
  return listarAsignacionesPorInterpreteRepository(interpreteId);
}
