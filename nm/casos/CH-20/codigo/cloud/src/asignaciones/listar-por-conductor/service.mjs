import { listarAsignacionesPorConductorRepository } from './repository.mjs';

export function listarAsignacionesPorConductorService(conductorId) {
  return listarAsignacionesPorConductorRepository(conductorId);
}
