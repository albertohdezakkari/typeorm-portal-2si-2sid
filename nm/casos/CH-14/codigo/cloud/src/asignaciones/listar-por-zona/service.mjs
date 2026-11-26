import { listarAsignacionesPorZonaRepository } from './repository.mjs';

export function listarAsignacionesPorZonaService(zonaId) {
  return listarAsignacionesPorZonaRepository(zonaId);
}
