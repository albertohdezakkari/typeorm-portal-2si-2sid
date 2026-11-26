import { listarAsignacionesPorArticuloRepository } from './repository.mjs';

export function listarAsignacionesPorArticuloService(articuloId) {
  return listarAsignacionesPorArticuloRepository(articuloId);
}
