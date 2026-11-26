import { listarAsignacionesPorTripulanteRepository } from './repository.mjs';

export function listarAsignacionesPorTripulanteService(tripulanteId) {
  return listarAsignacionesPorTripulanteRepository(tripulanteId);
}
