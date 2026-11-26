import { listarAsignacionesPorPanaderoRepository } from './repository.mjs';

export function listarAsignacionesPorPanaderoService(panaderoId) {
  return listarAsignacionesPorPanaderoRepository(panaderoId);
}
