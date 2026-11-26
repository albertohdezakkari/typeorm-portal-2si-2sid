import { listarAsignacionesPorCocineroRepository } from './repository.mjs';

export function listarAsignacionesPorCocineroService(cocineroId) {
  return listarAsignacionesPorCocineroRepository(cocineroId);
}
