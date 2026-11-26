import { listarAsignacionesPorEnfermeroRepository } from './repository.mjs';

export function listarAsignacionesPorEnfermeroService(enfermeroId) {
  return listarAsignacionesPorEnfermeroRepository(enfermeroId);
}
